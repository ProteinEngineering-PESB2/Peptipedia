
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class MVPeptidesByDatabase(Base):
    """Materialized view peptide_by_database"""
    __tablename__ = "peptides_by_database"
    name = Column(String, primary_key=True)
    count_peptide = Column(Integer)
    def __repr__(self):
        return f"MV_peptides_by_database(name={self.name}, count={self.count_peptide})"
    def definition(self):
        return """create materialized view peptides_by_database as
            SELECT s.name,
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
    count_peptide = Column(Integer)
    def __repr__(self):
        return f"MV_peptides_by_activity(name={self.name}, count={self.count_peptide})"
    def definition(self):
        return """create materialized view peptides_by_activity as
        SELECT a.id_activity, a.name,
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
        return """create materialized view general_information as
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
    __tablename__ = "peptide_with_activities"
    id_peptide = Column(Integer, primary_key=True)
    sequence = Column(String)
    activities = Column(String)
    def __repr__(self):
        return f"peptide_with_activity(sequence={self.sequence}, activities={self.activities}"
    def definition(self):
        return """create materialized view peptide_with_activities as
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
        return """
        create materialized view peptides_general_counts as
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
        return """
        create materialized view labeled_peptides_general_counts as
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