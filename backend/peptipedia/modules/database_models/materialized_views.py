
from sqlalchemy import Column, Date, Integer, String, ARRAY
from sqlalchemy.orm import declarative_base
from peptipedia.modules.database_models.table_models import *

Base = declarative_base()

class MVPeptidesByDatabase(Base):
    """Materialized view peptide_by_database"""
    __tablename__ = "peptides_by_database"
    id_source = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    url = Column(String)
    count_peptide = Column(Integer)
    def __repr__(self):
        return f"MV_peptides_by_database(name={self.name}, count={self.count_peptide})"
    def definition(self):
        return f"""create materialized view {self.__tablename__} as
            SELECT s.id_source, s.name,
            s.description, s.url,
            t.count AS count_peptide
            FROM source s
                JOIN ( SELECT phs.id_source,
                    count(*) AS count
                    FROM peptide p
                        JOIN peptide_has_source phs ON p.id_peptide = phs.id_peptide
                    GROUP BY phs.id_source) t ON s.id_source = t.id_source
            ORDER BY t.count DESC;"""
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"

class MVPeptidesByActivity(Base):
    """Materialized view peptide_by_activity"""
    __tablename__ = "peptides_by_activity"
    id_activity = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    id_parent = Column(Integer)
    count_peptide = Column(Integer)
    def __repr__(self):
        return f"MV_peptides_by_activity(name={self.name}, count={self.count_peptide})"
    def definition(self):
        return f"""create materialized view {self.__tablename__} as
        SELECT a.id_activity, a.name,
        a.description, a.id_parent,
        t.count AS count_peptide
        FROM activity a
            JOIN ( SELECT pha.id_activity,
                count(*) AS count
                FROM peptide p
                    JOIN peptide_has_activity pha ON p.id_peptide = pha.id_peptide
                GROUP BY pha.id_activity) t ON a.id_activity = t.id_activity
        ORDER BY t.count DESC;"""
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"

class MVGeneralInformation(Base):
    __tablename__ = "general_information"
    databases = Column(Integer, primary_key=True)
    sequences = Column(Integer, primary_key=True)
    activity = Column(Integer, primary_key=True)
    last_update = Column(Date, primary_key=True)
    def __repr__(self):
        return f"general_information(databases={self.databases}, sequences={self.sequences}, activity={self.activity}, last_update={self.last_update})"
    def definition(self):
        return f"""create materialized view {self.__tablename__} as
            SELECT cs.count AS databases,
            ca.count AS activity,
            lu.max AS last_update,
            cp.count AS sequences
            FROM
                (SELECT count(s.id_source) AS count
                FROM source s) as cs,
                (SELECT count(a.id_activity) AS count
                FROM activity a) as ca,
                (SELECT max(p.act_date) AS max
                FROM peptide p) lu,
                (SELECT count(p.id_peptide) AS count
                FROM peptide p) cp;"""
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"

    
class MVPeptideWithActivity(Base):
    __tablename__ = "peptide_with_activity"
    id_peptide = Column(Integer, primary_key=True)
    sequence = Column(String)
    activities = Column(String)
    def __repr__(self):
        return f"peptide_with_activity(sequence={self.sequence}, activities={self.activities}"
    def definition(self):
        return f"""create materialized view {self.__tablename__} as
        select p.id_peptide as id_peptide, p.sequence as sequence, string_agg(a.name, ',') as activities
        from peptide_has_activity pha
        join peptide p on p.id_peptide = pha.id_peptide
        join activity a on pha.id_activity = a.id_activity
        WHERE p.is_canon is true
        group by p.sequence, p.id_peptide;"""
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"

class MVPeptidesGeneralCounts(Base):
    __tablename__ = "peptides_general_counts"
    all_peptides = Column(Integer, primary_key=True)
    canon_peptides = Column(Integer)
    non_canon_peptides = Column(Integer)
    def definition(self):
        return f"""
        create materialized view {self.__tablename__} as
        select peptides as all_peptides, canon_peptides, (peptides - canon_peptides) as non_canon_peptides
        from (select count(*) as peptides from peptide) as peptides_t,
        (select count(*) as canon_peptides from peptide
        where is_canon is true) as canon_peptides_t;
        """
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"

class MVLabeledPeptidesGeneralCounts(Base):
    __tablename__ = "labeled_peptides_general_counts"
    all_peptides = Column(Integer, primary_key=True)
    canon_peptides = Column(Integer)
    non_canon_peptides = Column(Integer)
    def definition(self):
        return f"""
        create materialized view {self.__tablename__} as
        select all_peptides, canon_peptides, all_peptides - canon_peptides as non_canon_peptides
        from
        (select count(distinct id_peptide) as all_peptides
        from peptide_has_activity) as all_peptides_labeled_t,
        (select count(distinct pha.id_peptide) as canon_peptides
        from peptide_has_activity pha
        join peptide p on p.id_peptide = pha.id_peptide
        where p.is_canon is true) as canon_peptides_labeled_t;"""
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"

class MVSequencesByActivity(Base):
    __tablename__ = "sequences_by_activity"
    id_peptide = Column(Integer, primary_key=True)
    sequence = Column(String)
    is_canon = Column(Boolean)
    id_activity = Column(Integer, primary_key=True)
    def definition(self):
        return f"""
        create materialized view {self.__tablename__} as
        select p.id_peptide, p.sequence, p.is_canon, pha.id_activity
        from peptide_has_activity pha 
        join peptide p on pha.id_peptide = p.id_peptide
        """
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"
    
class MVSequencesBySource(Base):
    __tablename__ = "sequences_by_source"
    id_peptide = Column(Integer, primary_key=True)
    sequence = Column(String)
    is_canon = Column(Boolean)
    id_source = Column(Integer, primary_key=True)
    def definition(self):
        return f"""
        create materialized view {self.__tablename__} as
        select p.id_peptide, p.sequence, p.is_canon, phs.id_source
        from peptide_has_source phs join peptide p on phs.id_peptide = p.id_peptide;
        """
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"
    
class MVPeptideProfile(Base):
    __tablename__ = "peptide_profile"
    id_peptide = Column(Integer, primary_key=True)
    sequence = Column(String)
    is_canon = Column(Boolean)
    length = Column(Float)
    molecular_weight = Column(Float)
    charge = Column(Float)
    charge_density = Column(Float)
    instability_index = Column(Float)
    aromaticity = Column(Float)
    aliphatic_index = Column(Float)
    boman_index = Column(Float)
    isoelectric_point = Column(Float)
    hydrophobic_ratio = Column(Float)
    id_activities = Column(String)
    activities = Column(String)
    def definition(self):
        return f"""
        create materialized view {self.__tablename__} as
        SELECT p.id_peptide, p.sequence, p.is_canon,
        p.length, p.molecular_weight, p.charge,
        p.charge_density, p.instability_index, p.aromaticity,
        p.aliphatic_index, p.boman_index, p.isoelectric_point,
        p.hydrophobic_ratio,
        array_agg(act.id_activity) AS id_activities,
        array_agg(act.name) AS activities,

        FROM peptide p
            LEFT JOIN peptide_has_activity pha ON p.id_peptide = pha.id_peptide
            LEFT JOIN activity act ON pha.id_activity = act.id_activity
        GROUP BY p.id_peptide, p.sequence;
        """
    def refresh(self):
        return f"refresh materialized view {self.__tablename__};"