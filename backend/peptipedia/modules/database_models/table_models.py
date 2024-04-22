"""ORM Models"""
from sqlalchemy import Column, Float, Boolean, Date
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ARRAY
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Peptide(Base):
    """Peptide table"""
    __tablename__ = "peptide"
    id_peptide = Column(Integer, primary_key = True)
    sequence = Column(String, nullable = False)
    is_canon = Column(Boolean, nullable = False)
    swissprot_id = Column(String, nullable=True)
    nutraceutical = Column(Boolean, nullable=True)
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
    
    keyword = Column(String, nullable=True)
    patent = Column(String, nullable=True)
    reference = Column(String, nullable=True)
    half_life = Column(String, nullable=True)
    
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
    url = Column(String, nullable=False)
    type = Column(String, nullable=False)
    peptide_has_source_r = relationship("PeptideHasSource")
    def __repr__(self):
        return f"Source(id={self.id}, name={self.name})"  

class Activity(Base):
    """Activity table"""
    __tablename__ = "activity"
    id_activity = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    id_parent = Column(Integer, ForeignKey("activity.id_activity"), nullable=True)
    peptide_has_activity_r = relationship("PeptideHasActivity")
    activity_has_parent_r = relationship("Activity")
    def __repr__(self):
        return f"Activity(id={self.id_activity}, name={self.name})"

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
    id_peptide = Column(Integer, ForeignKey("peptide.id_peptide"), nullable=False, primary_key=True)
    id_activity = Column(Integer, ForeignKey("activity.id_activity"), nullable=False,  primary_key=True)
    predicted = Column(Boolean, nullable=False)
    def __repr__(self):
        return f"PeptideHasActivity(id_peptide={self.id_peptide}, id_activity={self.id_activity})"

class PeptideHasGO(Base):
    """Peptide has go table"""
    __tablename__ = "peptide_has_go"
    id_peptide = Column(Integer, ForeignKey("peptide.id_peptide"), nullable=False, primary_key=True,)
    id_go = Column(Integer, ForeignKey("gene_ontology.id_go"), nullable=False,  primary_key=True)
    probability = Column(Float)
    def __repr__(self):
        return f"PeptideHasGO(id_peptide={self.id_peptide}, id_go={self.id_go})"
    
class Pfam(Base):
    """Pfam table"""
    __tablename__ = "pfam"
    id_pfam = Column(Integer, nullable=False, primary_key=True)
    hmm_acc = Column(String)
    hmm_name = Column(String)
    type = Column(String)
    clan = Column(String)
    def __repr__(self):
        return f"Pfam(id_pfam={self.id_pfam}, hmm_acc={self.hmm_acc}, hmm_name={self.hmm_name})"
    
class PeptideHasPfam(Base):
    __tablename__ = "peptide_has_pfam"
    id_peptide = Column(Integer, ForeignKey("peptide.id_peptide"), nullable=False, primary_key=True,)
    id_pfam = Column(Integer, ForeignKey("pfam.id_pfam"), nullable=False, primary_key=True)
    e_value = Column(Float)
    significance = Column(Float)
    bit_score = Column(Float)
    def __repr__(self):
        return f"PeptideHasPfam(id_peptide={self.id_peptide}, id_pfam={self.id_pfam})"
        
class PredictiveModel(Base):
    __tablename__ = "predictive_model"
    id_activity = Column(Integer, ForeignKey("activity.id_activity"), nullable=False, primary_key=True)
    algorithm = Column(String, nullable=False)
    encoder = Column(String, nullable=False)
    def __repr__(self):
        return f"PredictiveModel(id_activity={self.id_activity})"