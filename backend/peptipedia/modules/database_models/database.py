"""Database functionalities module"""
import pandas as pd
from sqlalchemy import create_engine, text,select, func
from sqlalchemy.orm import Session
from dotenv import dotenv_values
from peptipedia.modules.database_models.table_models import *
from peptipedia.modules.database_models.materialized_views import *
import peptipedia.config as config
from peptipedia.modules.database_models.table_models import Base as BaseTables
import networkx as nx
from networkx.readwrite import json_graph
from itertools import combinations

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

    def create_downloads(self):
        stmt = select(Activity)
        
        act = self.get_table_query(stmt)
        for _, row in act.iterrows():
            stmt = (
                select(MVSequencesByActivity)
                .where(MVSequencesByActivity.id_activity == row.id_activity)
                .limit(5))
            df = self.get_table_query(stmt)
            fasta_text = ""
            for _,row_df in df.iterrows():
                fasta_text += f">{row_df.id_peptide}\n{row_df.sequence}\n"
            with open(config.downloads_folder + "/"+ row["name"] +".fasta", mode="w", encoding="utf-8") as file:
                file.write(fasta_text)

        stmt = select(Source)
        act = self.get_table_query(stmt)
        for _, row in act.iterrows():
            stmt = (
                select(MVSequencesBySource)
                .where(MVSequencesBySource.id_source == row.id_source)
                .limit(5))
            df = self.get_table_query(stmt)
            fasta_text = ""
            for _,row_df in df.iterrows():
                fasta_text += f">{row_df.id_peptide}\n{row_df.sequence}\n"
            with open(config.downloads_folder + "/"+ row["name"] +".fasta", mode="w", encoding="utf-8") as file:
                file.write(fasta_text)

    def create_fasta_from_peptides(self):
        """Create fasta in files folder"""
        #Deja los péptidos en fasta en la carpeta 
        stmt = select(Peptide.id_peptide, Peptide.sequence).where(Peptide.is_canon == True).limit(20000)
        peptides = self.get_table_query(stmt)
        fasta_text = ""
        for _,row in peptides.iterrows():
            fasta_text += f">{row.id_peptide}\n{row.sequence}\n"

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

    def get_count_activities_table(self):
        stmt_count_activities = select(MVPeptidesByActivity)
        df_count_activities = self.get_table_query(stmt_count_activities)
        df_count_activities = df_count_activities.rename(columns={"id_activity": "_id"})
        df_count_activities = df_count_activities.drop(columns=["description", "id_parent"])
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
    
    def get_count_activities_plot(self):
        stmt_count_activities = select(MVPeptidesByActivity).where(MVPeptidesByActivity.id_parent==None)
        df_count_activities = self.get_table_query(stmt_count_activities)
        df_count_activities = df_count_activities.rename(columns={"id_activity": "_id"})
        df_count_activities = df_count_activities.drop(columns=["description", "id_parent"])
        return {
            "plot":{
                "x": df_count_activities["name"].to_list(),
                "y": df_count_activities["count_peptide"].to_list(),
            }
        }

    def get_count_sources(self):
        stmt_count_sources = select(MVPeptidesByDatabase)
        df_count_sources = self.get_table_query(stmt_count_sources)
        df_count_sources = df_count_sources.rename(columns={"id_source": "_id"})
        df_count_sources = df_count_sources.drop(columns=["url"])
        df_count_sources["name"] = df_count_sources["name"].map(capitalize_phrase)
        return {
            "table":{
                "data": df_count_sources.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_count_sources.columns.to_list()]
            }
        }

    def get_activity(self, id_activity):
        stmt_activity = select(MVPeptidesByActivity).where(MVPeptidesByActivity.id_activity == id_activity)
        df = self.get_table_query(stmt_activity)
        df = df.fillna("")
        df = df.astype(str)
        return {
            "name": df["name"][0],
            "description": df["description"][0],
            "count": int(df["count_peptide"][0])
        }
    
    def get_source(self, id_source):
        stmt_source = select(MVPeptidesByDatabase).where(MVPeptidesByDatabase.id_source == id_source)
        df = self.get_table_query(stmt_source)
        df = df.fillna("")
        df = df.astype(str)
        return {
            "name": df["name"][0],
            "url": df["url"][0],
            "count": int(df["count_peptide"][0])
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

    def iterate_over_tree(self, df, tree):
        for row in tree:
            if "children" in row.keys():
                self.iterate_over_tree(df, row["children"])
            name = df[df["id_activity"] == row["id"]]["name"].values[0]
            count = df[df["id_activity"] == row["id"]]["count_peptide"].values[0]
            row["name"] = f"""{name} ({count})"""

    def get_tree(self):
        stmt = select(MVPeptidesByActivity)
        df = self.get_table_query(stmt)
        G = nx.DiGraph()
        G.add_node(0)
        df = df.fillna(0)
        for _, row in df.iterrows():
            G.add_node(row.id_activity)
        for _, row in df.iterrows():
            G.add_edge(row.id_parent, row.id_activity)
        data = json_graph.tree_data(G, ident= "id", root=0, children="children")
        self.iterate_over_tree(df, data["children"])
        return { "tree": data }
    
    def get_enrichment(self, id_peptide):
        stmt = select(MVPfamByPeptide).where(MVPfamByPeptide.id_peptide == id_peptide)
        pfam = self.get_table_query(stmt)
        pfam = pfam.drop(columns=["id_pfam", "id_peptide"], errors="ignore")
        pfam = pfam.rename(columns = {"hmm_acc": "_id"})
        if len(pfam) > 0:
            pfam["_id"], _ = zip(*pfam["_id"].str.split("."))
            pfam_dict = {
                "data": pfam.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in pfam.columns.to_list()]
            }
        else:
            pfam_dict = None
        stmt = select(MVGoByPeptide).where(MVGoByPeptide.id_peptide == id_peptide)
        go = self.get_table_query(stmt)
        go = go.drop(columns=["id_go", "id_peptide"], errors="ignore")
        go = go.rename(columns = {"accession": "_id"})

        if len(go) > 0:
            go_dict = {
                "data": go.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in go.columns.to_list()]
            }
        else:
            go_dict = None
        return {
            "pfam": pfam_dict,
            "go": go_dict
        }
    
    def get_peptide(self, id_peptide):
        stmt = select(MVPeptideProfile).where(MVPeptideProfile.id_peptide == id_peptide)
        df = self.get_table_query(stmt)
        is_canon = bool(df["is_canon"].values[0])
        df = df.astype(str)
        sequence = dict(df.iloc[0])["sequence"]
        swissprot_id = dict(df.iloc[0])["swissprot_id"]

        if swissprot_id == "None":
            swissprot_id = None

        if is_canon == True:
            phy_prop = df[["length", "molecular_weight", "charge",
                        "charge_density", "instability_index",
                        "aromaticity", "aliphatic_index", "boman_index",
                        "isoelectric_point", "hydrophobic_ratio" ]].T
            
            phy_prop["property"] = phy_prop.index
            phy_prop["value"] = phy_prop[0]
            phy_prop = phy_prop[["property", "value"]]
            phy_prop["property"] = phy_prop["property"].map(capitalize_phrase)
            phy_prop_table = {
                "data": phy_prop.values.tolist(),
                "columns": [capitalize_phrase(phrase)
                            for phrase in phy_prop.columns.to_list()]
            }
        else:
            phy_prop_table = None

        activities = eval(df["activities"][0])
        id_activities = eval(df["id_activities"][0])
        if activities == []:
            activities = None

        sources = eval(df["sources"][0])
        id_sources = eval(df["id_sources"][0])
        if sources == []:
            sources = None
        return {
            "peptide": {
                "sequence": sequence,
                "is_canon": is_canon,
                "swissprot_id": swissprot_id,
                "physicochemical_properties": phy_prop_table,
                "activities": activities,
                "id_activities": id_activities,
                "sources": sources,
                "id_sources": id_sources
            }
        }
    
    def get_peptide_params(self):
        stmt = select(MVPeptideParams)
        df = self.get_table_query(stmt)
        df.index = ["min", "max"]
        params = df.to_dict(orient="dict")
        stmt = select(Activity)
        df = self.get_table_query(stmt)[["id_activity", "name"]]
        activities = df.to_dict(orient="list")
        return {"physicochemical_properties": params,
                "activities": activities}
    
    def get_count_search(self, query):
        stmt = select(func.count(MVSearchPeptide.id_peptide))
        stmt = parse_data_query(query, MVSearchPeptide, stmt)
        df = self.get_table_query(stmt)
        count = int(df.values[0][0])
        return {"count": count}
    
    def get_sequences_by_search(self, data):
        limit = data["rowsPerPage"]
        page = data["page"]
        stmt = select(MVSearchPeptide.id_peptide, MVSearchPeptide.sequence,
                      MVSearchPeptide.is_canon)
        stmt = parse_data_query(data, MVSearchPeptide, stmt)
        stmt_sequences = stmt.offset(limit*page).limit(limit)
        df_canon = self.get_table_query(stmt_sequences)
        df_canon = df_canon.drop(columns = ["id_source"], errors='ignore')
        df_canon = df_canon.astype(str)
        df_canon["sequence"] = df_canon["sequence"].map(split_sequence)
        df_canon = df_canon.replace(to_replace="True", value="Canon")
        df_canon = df_canon.replace(to_replace="False", value="Non canon")
        df_canon = df_canon.rename(columns={"is_canon": "Type"})
        return {
            "table":{
                "data": df_canon.values.tolist(),
                "columns": [capitalize_phrase(phrase) for phrase in df_canon.columns.to_list()],
            }
        }

    def get_chord(self):
        stmt = select(MVFirstLevel)
        df = self.get_table_query(stmt)
        acts = df.name.unique()
        data = []
        for i, j in combinations(acts, 2):
            merged_len = len(pd.merge(df[df.name == i][["id_peptide"]], df[df.name == j][["id_peptide"]], on="id_peptide"))
            if merged_len != 0:
                data.append([i, j, merged_len])
        return {
            "data": data
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

def parse_data_query(query, Model, stmt):
    if "is_canon" in query.keys():
        stmt = stmt.where(Model.is_canon == query["is_canon"])

    if "sequence" in query.keys():
        stmt = stmt.where(Model.sequence.like(f'%{query["sequence"]}%'))

    if "swissprot_id" in query.keys():
        stmt = stmt.where(Model.swissprot_id == query["swissprot_id"])

    if "length" in query.keys():
        stmt = stmt.where(Model.length >= query["length"][0])
        stmt = stmt.where(Model.length <= query["length"][1])
        
    if "molecular_weight" in query.keys():
        stmt = stmt.where(Model.molecular_weight >= query["molecular_weight"][0])
        stmt = stmt.where(Model.molecular_weight <= query["molecular_weight"][1])
        
    if "charge" in query.keys():
        stmt = stmt.where(Model.charge >= query["charge"][0])
        stmt = stmt.where(Model.charge <= query["charge"][1])
    
    if "activities" in query.keys():
        for act in query["activities"]:
            stmt = stmt.where(Model.activities.any(act))
    return stmt

if __name__ == "__main__":
    path_to_tables = "~/Documentos/peptipedia_parser_scripts/tables/"
    db = Database()
    db.create_tables()
    db.insert_data(f"{path_to_tables}peptide.csv", Peptide, chunk=5000)
    print("peptide")
    db.insert_data(f"{path_to_tables}source.csv", Source, chunk=100)
    print("source")
    db.insert_data(f"{path_to_tables}peptide_has_source.csv", PeptideHasSource, chunk=100)
    print("peptide_has_source")
    db.insert_data(f"{path_to_tables}activity.csv", Activity, chunk=100)
    print("activity")
    db.insert_data(f"{path_to_tables}peptide_has_activity.csv", PeptideHasActivity, chunk=100)
    print("peptide_has_activity")
    db.insert_data(f"{path_to_tables}pfam.csv", Pfam, chunk=1000)
    print("pfam")
    db.insert_data(f"{path_to_tables}peptide_has_pfam.csv", PeptideHasPfam, chunk=1000)
    print("peptide_has_pfam")
    db.insert_data(f"{path_to_tables}gene_ontology.csv", GeneOntology, chunk=1000)
    print("go")
    db.insert_data(f"{path_to_tables}peptide_has_go.csv", PeptideHasGO, chunk=1000)
    print("peptide_has_go")
    db.create_mv(MVPeptidesByDatabase)
    db.create_mv(MVPeptidesByActivity)
    db.create_mv(MVGeneralInformation)
    db.create_mv(MVPeptideWithActivity)
    db.create_mv(MVPeptidesGeneralCounts)
    db.create_mv(MVLabeledPeptidesGeneralCounts)
    db.create_mv(MVSequencesByActivity)
    db.create_mv(MVSequencesBySource)
    db.create_mv(MVPeptideProfile)
    db.create_mv(MVPeptideParams)
    db.create_mv(MVSearchPeptide)
    db.create_mv(MVFirstLevel)
    db.create_mv(MVActivitiesListed)
    db.create_mv(MVSourcesListed)
    db.create_mv(MVPfamByPeptide)
    db.create_mv(MVGoByPeptide)