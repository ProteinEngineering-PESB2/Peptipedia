from datetime import date
from typing import Optional

from advanced_alchemy.base import CommonTableAttributes
from sqlalchemy import ForeignKey
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(CommonTableAttributes, AsyncAttrs, DeclarativeBase):
    pass


class Peptide(Base):
    __tablename__ = "peptides"

    id: Mapped[int] = mapped_column(primary_key=True)
    # basic information
    sequence: Mapped[str]
    is_canon: Mapped[bool]
    swissprot_id: Mapped[Optional[str]]
    nutraceutical: Mapped[Optional[bool]]
    act_date: Mapped[Optional[date]]
    # properties
    length: Mapped[Optional[int]]
    molecular_weight: Mapped[Optional[float]]
    isoelectric_point: Mapped[Optional[float]]
    charge_density: Mapped[Optional[float]]
    charge: Mapped[Optional[float]]
    instability_index: Mapped[Optional[float]]
    aromaticity: Mapped[Optional[float]]
    aliphatic_index: Mapped[Optional[float]]
    boman_index: Mapped[Optional[float]]
    hydrophobic_ratio: Mapped[Optional[float]]
    # additional information
    keyword: Mapped[Optional[str]]
    patent: Mapped[Optional[str]]
    reference: Mapped[Optional[str]]
    half_life: Mapped[Optional[str]]

    # peptide_has_source_r = relationship("PeptideHasSource")
    # peptide_has_activity_r = relationship("PeptideHasActivity")
    # peptide_has_go_r = relationship("PeptideHasGO")

    def __repr__(self):
        return f"Peptide(id={self.id}, sequence='{self.sequence}')"


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    url: Mapped[str]
    type: Mapped[str]

    # peptide_has_source_r = relationship("PeptideHasSource")

    def __repr__(self):
        return f"Source(id={self.id}, name={self.name})"


class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]
    parent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("activities.id"))

    parent: Mapped[Optional["Activity"]] = relationship(back_populates="children", remote_side=[id])
    children: Mapped[list["Activity"]] = relationship(back_populates="parent")

    # peptide_has_activity_r = relationship("PeptideHasActivity")

    def __repr__(self):
        return f"Activity(id={self.id}, name={self.name})"


class GeneOntology(Base):
    __tablename__ = "gene_ontologies"

    id: Mapped[int] = mapped_column(primary_key=True)
    accession: Mapped[str]
    term: Mapped[str]
    description: Mapped[str]
    is_obsolete: Mapped[bool]
    source: Mapped[str]

    # peptide_has_go_r = relationship("PeptideHasGO")

    def __repr__(self):
        return f"GeneOntology(id={self.id}, accession={self.accession})"


class Pfam(Base):
    __tablename__ = "pfams"

    id: Mapped[int] = mapped_column(primary_key=True)
    hmm_acc: Mapped[str]
    hmm_name: Mapped[str]
    type: Mapped[str]
    clan: Mapped[str]

    def __repr__(self):
        return f"Pfam(id={self.id}, hmm_acc={self.hmm_acc}, hmm_name={self.hmm_name})"


class PredictiveModel(Base):
    __tablename__ = "predictive_models"

    activity_id: Mapped[int] = mapped_column(ForeignKey("activities.id"), primary_key=True)
    algorithm: Mapped[str]
    encoder: Mapped[str]

    def __repr__(self):
        return f"PredictiveModel(activity_id={self.activity_id})"


class PeptidesSources(Base):
    __tablename__ = "peptides_to_sources"

    peptide_id: Mapped[int] = mapped_column(ForeignKey("peptides.id"), primary_key=True)
    source_id: Mapped[int] = mapped_column(ForeignKey("sources.id"), primary_key=True)

    def __repr__(self):
        return f"PeptideSources(peptide_id={self.peptide_id}, source_id={self.source_id})"


class PeptidesActivities(Base):
    __tablename__ = "peptides_to_activities"

    peptide_id: Mapped[int] = mapped_column(ForeignKey("peptides.id"), primary_key=True)
    activity_id: Mapped[int] = mapped_column(ForeignKey("activities.id"), primary_key=True)
    predicted: Mapped[bool]

    def __repr__(self):
        return f"PeptidesActivities(peptide_id={self.peptide_id}, activity_id={self.activity_id})"


class PeptidesGOs(Base):
    __tablename__ = "peptides_to_gos"

    peptide_id: Mapped[int] = mapped_column(ForeignKey("peptides.id"), primary_key=True)
    go_id: Mapped[int] = mapped_column(ForeignKey("gene_ontologies.id"), primary_key=True)
    probability: Mapped[float]

    def __repr__(self):
        return f"PeptidesGOs(peptide_id={self.peptide_id}, go_id={self.go_id})"


class PeptidesPfams(Base):
    __tablename__ = "peptides_to_pfams"

    peptide_id: Mapped[int] = mapped_column(ForeignKey("peptides.id"), primary_key=True)
    pfam_id: Mapped[int] = mapped_column(ForeignKey("pfams.id"), primary_key=True)
    e_value: Mapped[float]
    significance: Mapped[float]
    bit_score: Mapped[float]

    def __repr__(self):
        return f"PeptidesPfams(peptide_id={self.peptide_id}, pfam_id={self.pfam_id})"
