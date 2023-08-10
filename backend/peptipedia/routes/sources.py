"""Home routes"""
from flask import Blueprint, request
from peptipedia.modules.database_models.database import Database
from sqlalchemy.orm import Session
db = Database()
session = Session()
sources_blueprint = Blueprint("sources_blueprint", __name__)

@sources_blueprint.route("/get_count_sources/", methods=["GET"])
def get_count_sources():
    """Gets count of peptides by activity"""
    try:
        res = db.get_count_sources()
        return res
    except Exception as e:
        print(e)
        session.rollback()

@sources_blueprint.route("/get_source/<id_source>", methods=["GET"])
def get_source(id_source):
    """Gets activity information"""
    try:
        res = db.get_source(id_source)
        return res
    except Exception as e:
        print(e)
        session.rollback()

@sources_blueprint.route("/get_sequences_by_source/<id_source>", methods=["POST"])
def get_sequences_by_source(id_source):
    """Gets count of peptides by activity"""
    try:
        post_data = request.json
        res = db.get_sequences_by_source(id_source, post_data)
        return res
    except Exception as e:
        print(e)
        session.rollback()
