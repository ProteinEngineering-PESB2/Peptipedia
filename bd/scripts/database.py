"""Database module"""
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select
import pandas as pd
from table_models import Base as BaseTables
from materialized_views import Base as BaseMV
from materialized_views import (MVPeptidesByActivity, MVPeptidesByDatabase, MVGeneralInformation, MVPeptideWithActivity,
                                MVPeptidesGeneralCounts, MVLabeledPeptidesGeneralCounts)
import config
from table_models import Peptide, Source, PeptideHasSource, GeneOntology, PeptideHasGO, Activity, PeptideHasActivity
from sqlalchemy import text
class Connection():
    """Database connection class for db administration"""
    def __init__(self, config):
        user = config.USER
        password = config.PASSWORD
        host = config.HOST
        port = config.PORT
        db_name = config.DB_NAME
        uri = f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{db_name}"
        self.engine = create_engine(uri)
        self.engine.connect()
        self.session = Session(self.engine, future=True)

    def get_table(self, model):
        """Aplies a select statement"""
        stmt = select(model)
        return pd.read_sql(stmt, con = self.con)

    def get_table_query(self, stmt):
        """Applies a select for a previous stmt"""
        return pd.read_sql(stmt, con = self.con)

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
        
if __name__ == "__main__":
    db = Connection(config=config)
    """
    db.create_tables()
    db.insert_data("../tables/activity.csv", Activity, chunk=100)
    print("activity")
    db.insert_data("../tables/peptide.csv", Peptide, chunk=5000)
    print("peptide")
    db.insert_data("../tables/source.csv", Source, chunk=100)
    print("source")
    db.insert_data("../tables/peptide_has_source.csv", PeptideHasSource, chunk=100)
    print("peptide_has_source")
    db.insert_data("../tables/gene_ontology.csv", GeneOntology, chunk=5000)
    print("gene_ontology")
    db.insert_data("../tables/peptide_has_go.csv", PeptideHasGO, chunk=5000)
    print("peptide_has_go")
    """
    db.insert_data("../tables/peptide_has_activity.csv", PeptideHasActivity, chunk=100)
    print("peptide_has_activity")
    db.create_mv(MVPeptidesByDatabase)
    db.create_mv(MVGeneralInformation)
    db.create_mv(MVPeptideWithActivity)
    db.create_mv(MVPeptidesGeneralCounts)
    db.create_mv(MVLabeledPeptidesGeneralCounts)
    db.create_mv(MVPeptidesByActivity)