"""Home routes"""
from flask import Blueprint
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
        