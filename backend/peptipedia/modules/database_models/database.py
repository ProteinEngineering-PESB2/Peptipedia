"""Database functionalities module"""
import json
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import dotenv_values
from peptipedia.modules.database_models.table_models import *
from peptipedia.modules.database_models.materialized_views import *
from sqlalchemy import select
import peptipedia.config as config


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

    def get_table(self, query):
        return pd.read_sql(text(query), con=self.conn)
    
    def get_table_query(self, stmt):
        """Applies a select for a previous stmt"""
        return pd.read_sql(stmt, con = self.conn)

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
    
    def get_sequences_by_activity(self, id_activity):
        stmt_activity = select(MVSequencesByActivity).where(MVSequencesByActivity.id_activity == id_activity)
        df_canon = self.get_table_query(stmt_activity)
        df_canon = df_canon.drop(columns = ["id_activity", "is_canon"])
        df_canon = df_canon.astype(str)
        df_canon["_id"] = df_canon["id_peptide"]
        df_canon["sequence"] = df_canon["sequence"].map(split_sequence)
        
        return {
            "table":{
                "data": df_canon.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_canon.columns.to_list()]
            }
        }

    def get_sequences_by_source(self, id_sources):
        stmt_activity = select(MVSequencesBySource).where(MVSequencesBySource.id_source == id_sources)
        df_canon = self.get_table_query(stmt_activity)
        df_canon = df_canon.drop(columns = ["id_source", "is_canon"])
        df_canon = df_canon.astype(str)
        df_canon["_id"] = df_canon["id_peptide"]
        df_canon["sequence"] = df_canon["sequence"].map(split_sequence)
        
        return {
            "table":{
                "data": df_canon.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_canon.columns.to_list()]
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