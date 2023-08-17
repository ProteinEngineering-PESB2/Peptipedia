"""Home routes"""
from flask import Blueprint, request
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

@activities_blueprint.route("/get_activity/<id_activity>", methods=["GET"])
def get_activity(id_activity):
    """Gets activity information"""
    try:
        res = db.get_activity(id_activity)
        return res
    except Exception as e:
        print(e)
        session.rollback()

@activities_blueprint.route("/get_sequences_by_activity/<id_activity>", methods=["POST"])
def get_sequences_by_activity(id_activity):
    """Gets sequences by activity"""
    try:
        post_data = request.json
        res = db.get_sequences_by_activity(id_activity, post_data)
        return res
    except Exception as e:
        print(e)
        session.rollback()

@activities_blueprint.route("/get_tree/", methods=["GET"])
def get_tree():
    """Gets tree data"""
    try:
        res = db.get_tree()
        return res
    except Exception as e:
        print(e)
        session.rollback()