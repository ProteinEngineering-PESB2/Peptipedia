"""Database functionalities module"""
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import dotenv_values
from peptipedia.modules.database_models.table_models import *
from peptipedia.modules.database_models.materialized_views import *
from sqlalchemy import select
import peptipedia.config as config
from peptipedia.modules.database_models.table_models import Base as BaseTables
from sqlalchemy.orm import Session

class Database:
    """Database class"""
    def __init__(self):
        # Config connection
        user = config.user
        db_name = config.db
        host = config.host
        password = dotenv_values(".env")["DB_PASS"]
        port = config.port
        self.engine = create_engine(
            f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}"
        )
        self.conn = self.engine.connect()
        # Config max items for selects
        self.max_items = config.select_limit
        self.session = Session(self.engine, future=True)
    
    def get_table(self, query):
        return pd.read_sql(text(query), con=self.conn)
    
    def get_table_query(self, stmt):
        """Applies a select for a previous stmt"""
        return pd.read_sql(stmt, con = self.conn)

    def insert_data(self, data_file, model, chunk):
        """Insert data from csv files"""
        tablename = model.__tablename__
        data = pd.read_csv(data_file, low_memory=False)
        data.to_sql(tablename,
            con = self.engine,
            if_exists = "append",
            method = "multi",
            chunksize = chunk,
            index = False,
            schema="public")

    def create_tables(self):
        """Create tables from ddl"""
        BaseTables.metadata.create_all(self.engine)

    def create_mv(self, model):
        definition = text(model().definition())
        refresh = text(model().refresh())
        self.session.execute(definition)
        self.session.commit()
        self.session.execute(refresh)
        self.session.commit()


    def create_fasta_from_peptides(self):
        """Create fasta in files folder"""
        #Deja los péptidos en fasta en la carpeta 
        stmt = select(Peptide.id_peptide, Peptide.sequence).where(Peptide.is_canon == True).limit(1000)
        peptides = self.get_table_query(stmt)
        fasta_text = ""
        for _,row in peptides.iterrows():
            fasta_text += f">{row.id_peptide}  \n{row.sequence}\n"

        with open(config.blastdb_folder + "/peptipedia.fasta", mode="w", encoding="utf-8") as file:
            file.write(fasta_text)

        with open(config.downloads_folder + "/all_peptides.fasta", mode="w", encoding="utf-8") as file:
            file.write(fasta_text)
        #Peptides with activity
        stmt = select(MVPeptideWithActivity).limit(1000)
        data = self.get_table_query(stmt)
        fasta_text = ""
        for _,row in data.iterrows():
            fasta_text += f">{row.id_peptide}|{row.activities}\n{row.sequence}\n"
        
        data.to_csv(config.downloads_folder + "/peptides_with_activity.csv", index=False)
        with open(config.downloads_folder + "/peptides_with_activity.fasta", mode="w", encoding="utf-8") as file:
            file.write(fasta_text)

    def get_home_statistics(self):
        stmt_general_counts = select(MVGeneralInformation)
        df_general_counts = self.get_table_query(stmt_general_counts)
        df_general_counts = df_general_counts.astype(str)
        stmt_peptides = select(MVPeptidesGeneralCounts)
        df_peptides = self.get_table_query(stmt_peptides)
        stmt_labeled_peptides = select(MVLabeledPeptidesGeneralCounts)
        df_labeled = self.get_table_query(stmt_labeled_peptides)
        df = pd.concat([df_peptides, df_labeled], ignore_index=True)
        df.loc[2] = df.loc[0] - df.loc[1]
        df["type"] = ["All", "Labeled", "Unlabeled"]
        df = df[["type", "all_peptides", "canon_peptides", "non_canon_peptides"]]
        general_dict = [{"type": capitalize_phrase(col), "value": df_general_counts[col].to_list()[0]} for col in df_general_counts.columns]
        return {
            "general_table": general_dict,
            "peptides_table": {
                "data": df.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df.columns.to_list()]
            }
        }

    def get_count_activities(self):
        stmt_count_activities = select(MVPeptidesByActivity)
        df_count_activities = self.get_table_query(stmt_count_activities)
        df_count_activities = df_count_activities.rename(columns={"id_activity": "_id"})
        return {
            "table":{
                "data": df_count_activities.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_count_activities.columns.to_list()]
            },
            "plot":{
                "x": df_count_activities["name"].to_list(),
                "y": df_count_activities["count_peptide"].to_list(),
            }
        }
    
    def get_count_sources(self):
        stmt_count_sources = select(MVPeptidesByDatabase)
        df_count_sources = self.get_table_query(stmt_count_sources)
        df_count_sources = df_count_sources.rename(columns={"id_source": "_id"})
        df_count_sources["name"] = df_count_sources["name"].map(capitalize_phrase)
        return {
            "table":{
                "data": df_count_sources.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_count_sources.columns.to_list()]
            },
            "plot":{
                "x": df_count_sources["name"].to_list(),
                "y": df_count_sources["count_peptide"].to_list()
            }
        }

    def get_activity(self, id_activity):
        stmt_activity = select(Activity).where(Activity.id_activity == id_activity)
        df = self.get_table_query(stmt_activity)
        df = df.fillna("")
        return {
            "name": df["name"][0],
            "description": df["description"][0]
        }
    
    def get_source(self, id_source):
        stmt_source = select(Source).where(Source.id_source == id_source)
        df = self.get_table_query(stmt_source)
        df = df.fillna("")
        return {
            "name": df["name"][0],
            "description": df["description"][0]
        }
    
    def get_sequences_by_activity(self, id_activity, data):
        limit = data["rowsPerPage"]
        page = data["page"]
        search_text = data["searchText"]
        stmt_activity = (
            select(MVSequencesByActivity)
            .where(MVSequencesByActivity.id_activity == id_activity))
        if search_text is not None:
            stmt_activity = stmt_activity.where(MVSequencesByActivity.sequence.contains(search_text))
        stmt_activity = stmt_activity.offset(limit*page).limit(limit)

        df_canon = self.get_table_query(stmt_activity)
        df_canon = df_canon.drop(columns = ["id_activity", "is_canon"])
        df_canon = df_canon.astype(str)
        df_canon["sequence"] = df_canon["sequence"].map(split_sequence)
        
        return {
            "table":{
                "data": df_canon.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_canon.columns.to_list()]
            }
        }

    def get_sequences_by_source(self, id_sources, data):
        limit = data["rowsPerPage"]
        page = data["page"]
        search_text = data["searchText"]
        stmt_sequences = (
            select(MVSequencesBySource)
            .where(MVSequencesBySource.id_source == id_sources)
        )
        if search_text is not None:
            stmt_sequences = stmt_sequences.where(MVSequencesBySource.sequence.contains(search_text))    
        stmt_sequences = stmt_sequences.offset(limit*page).limit(limit)

        df_canon = self.get_table_query(stmt_sequences)
        df_canon = df_canon.drop(columns = ["id_source", "is_canon"])
        df_canon = df_canon.astype(str)
        df_canon["sequence"] = df_canon["sequence"].map(split_sequence)

        return {
            "table":{
                "data": df_canon.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_canon.columns.to_list()],
            }
        }

def capitalize_phrase(phrase):
    if phrase[0] != "_":
        phrase = phrase.replace("_", " ")
        phrase = phrase.capitalize()
    return phrase

def split_sequence(sequence):
    n = 80
    sequence = [sequence[i:i+n] for i in range(0, len(sequence), n)]
    sequence = "\n".join(sequence)
    return sequence


if __name__ == "__main__":
    db = Database()
    db.create_tables()
    """
    db.insert_data("../tables/peptide.csv", Peptide, chunk=5000)
    print("peptide")
    db.insert_data("../tables/activity.csv", Activity, chunk=100)
    print("activity")
    db.insert_data("../tables/peptide_has_activity.csv", PeptideHasActivity, chunk=100)
    print("peptide_has_activity")
    db.insert_data("~/Documentos/peptipedia_parser_scripts/tables/source.csv", Source, chunk=100)
    print("source")
    db.insert_data("~/Documentos/peptipedia_parser_scripts/tables/peptide_has_source.csv", PeptideHasSource, chunk=100)
    print("peptide_has_source")
    db.insert_data("../tables/gene_ontology.csv", GeneOntology, chunk=5000)
    print("gene_ontology")
    db.insert_data("../tables/peptide_has_go.csv", PeptideHasGO, chunk=5000)
    print("peptide_has_go")
    
    """
    db.create_mv(MVPeptidesByDatabase)
    db.create_mv(MVPeptidesByActivity)
    db.create_mv(MVGeneralInformation)
    db.create_mv(MVPeptideWithActivity)
    db.create_mv(MVPeptidesGeneralCounts)
    db.create_mv(MVLabeledPeptidesGeneralCounts)
    db.create_mv(MVSequencesByActivity)
    db.create_mv(MVSequencesBySource)