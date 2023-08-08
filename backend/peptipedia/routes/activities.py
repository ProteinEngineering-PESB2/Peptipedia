"""Home routes"""
from flask import Blueprint
from peptipedia.modules.database_models.database import Database
from sqlalchemy.orm import Session
db = Database()
session = Session()
activities_blueprint = Blueprint("activities_blueprint", __name__)

@activities_blueprint.route("/get_count_activities/", methods=["GET"])
def get_count_activities():
    """Gets count of peptides by activity"""
    try:
        res = db.get_count_activities()
        return res
    except Exception as e:
        print(e)
        session.rollback()
