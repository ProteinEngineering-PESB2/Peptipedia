"""Home routes"""
from flask import Blueprint
import peptipedia.config as config
from peptipedia.modules.database_models.database import Database
from sqlalchemy.orm import Session
db = Database()
session = Session()
home_blueprint = Blueprint("home_blueprint", __name__)

@home_blueprint.route("/get_general_counts/", methods=["GET"])
def get_general_counts():
    """Get count of peptides, activities, databases and last update"""
    try:
        res = db.get_general_counts()
        return res
    except Exception as e:
        print(e)
        session.rollback()

