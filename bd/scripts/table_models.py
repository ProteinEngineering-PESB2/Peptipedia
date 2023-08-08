"""ORM Models"""
from sqlalchemy import Column, Float, Boolean, Date
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Peptide(Base):
    """Peptide table"""
    __tablename__ = "peptide"
    id_peptide = Column(Integer, primary_key = True)
    sequence = Column(String, nullable = False)
    is_canon = Column(Boolean, nullable = False)
    ss3 = Column(String, nullable=True)
    ss8 = Column(String, nullable=True)
    acc = Column(String, nullable=True)
    diso = Column(String, nullable=True)
    tm2 = Column(String, nullable=True)
    tm8 = Column(String, nullable=True)
    act_date = Column(Date, nullable=True)
    length = Column(Integer, nullable=True)
    molecular_weight = Column(Float, nullable=True)
    isoelectric_point = Column(Float, nullable=True)
    charge_density = Column(Float, nullable=True)
    charge = Column(Float, nullable=True)
    instability_index  = Column(Float, nullable=True)
    aromaticity = Column(Float, nullable=True)
    aliphatic_index = Column(Float, nullable=True)
    boman_index = Column(Float, nullable=True)
    hydrophobic_ratio = Column(Float, nullable=True)
    
    peptide_has_source_r = relationship("PeptideHasSource")
    peptide_has_activity_r = relationship("PeptideHasActivity")
    peptide_has_go_r = relationship("PeptideHasGO")

    def __repr__(self):
        return f"Peptide(id={self.id})"

class Source(Base):
    """Source table"""
    __tablename__ = "source"
    id_source = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    peptide_has_source_r = relationship("PeptideHasSource")
    def __repr__(self):
        return f"Source(id={self.id}, name={self.name})"  

class Activity(Base):
    """Activity table"""
    __tablename__ = "activity"
    id_activity = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    peptide_has_activity_r = relationship("PeptideHasActivity")
    def __repr__(self):
        return f"Activity(id={self.id}, name={self.name})"

class GeneOntology(Base):
    """Gene ontology table"""
    #id_go,accession,term,description,is_obsolete,source
    __tablename__ = "gene_ontology"
    id_go = Column(Integer, primary_key=True)
    accession = Column(String, nullable=False)
    term = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_obsolete = Column(Boolean, nullable=False)
    source = Column(String, nullable=False)
    peptide_has_go_r = relationship("PeptideHasGO")

    def __repr__(self):
        return f"GeneOntology(id={self.id}, accession={self.accession})"

class PeptideHasSource(Base):
    """Peptide has source table"""
    __tablename__ = "peptide_has_source"
    id_peptide = Column(Integer, ForeignKey("peptide.id_peptide"), nullable=False, primary_key=True,)
    id_source = Column(Integer, ForeignKey("source.id_source"), nullable=False,  primary_key=True)

    def __repr__(self):
        return f"PeptideHasSource(id_peptide={self.id_peptide}, id_source={self.id_source})"

class PeptideHasActivity(Base):
    """Peptide has activity table"""
    __tablename__ = "peptide_has_activity"
    id_peptide = Column(Integer, ForeignKey("peptide.id_peptide"), nullable=False, primary_key=True,)
    id_activity = Column(Integer, ForeignKey("activity.id_activity"), nullable=False,  primary_key=True)

    def __repr__(self):
        return f"PeptideHasActivity(id_peptide={self.id_peptide}, id_activity={self.id_activity})"

class PeptideHasGO(Base):
    """Peptide has go table"""
    __tablename__ = "peptide_has_go"
    id_peptide = Column(Integer, ForeignKey("peptide.id_peptide"), nullable=False, primary_key=True,)
    id_go = Column(Integer, ForeignKey("gene_ontology.id_go"), nullable=False,  primary_key=True)

    def __repr__(self):
        return f"PeptideHasGO(id_peptide={self.id_peptide}, id_go={self.id_go})"
