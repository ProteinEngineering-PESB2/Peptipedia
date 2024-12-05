"""Home routes"""

from flask import Blueprint, request
from sqlalchemy.orm import Session

from peptipedia.modules.database_models.database import Database
from peptipedia.modules.utils import parse_response

db = Database()
session = Session()
activities_blueprint = Blueprint("activities_blueprint", __name__)


@activities_blueprint.route("/get_count_activities_table/", methods=["GET"])
def get_count_activities_table():
    """Gets count of peptides by activity"""
    try:
        res = db.get_count_activities_table()
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()


@activities_blueprint.route("/get_count_activities_plot/", methods=["GET"])
def get_count_activities_plot():
    """Gets count of peptides by activity"""
    try:
        res = db.get_count_activities_plot()
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()


@activities_blueprint.route("/get_chord/", methods=["POST"])
def get_chord():
    """Gets count of peptides by activity"""
    try:
        post_data = request.json
        res = db.get_chord(post_data["predicted"])
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()


@activities_blueprint.route("/get_activity/<id_activity>", methods=["GET"])
def get_activity(id_activity):
    """Gets activity information"""
    try:
        res = db.get_activity(id_activity)
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()


@activities_blueprint.route("/get_sequences_by_activity/<id_activity>", methods=["POST"])
def get_sequences_by_activity(id_activity):
    """Gets sequences by activity"""
    try:
        post_data = request.json
        res = db.get_sequences_by_activity(id_activity, post_data)
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()


@activities_blueprint.route("/get_predicted_sequences_by_activity/<id_activity>", methods=["POST"])
def get_predicted_sequences_by_activity(id_activity):
    """Gets sequences by activity"""
    try:
        post_data = request.json
        res = db.get_predicted_sequences_by_activity(id_activity, post_data)
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()


@activities_blueprint.route("/get_tree/", methods=["GET"])
def get_tree():
    """Gets tree data"""
    try:
        res = db.get_tree()
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()
