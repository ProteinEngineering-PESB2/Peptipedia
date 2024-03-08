"""Profile routes"""
from flask import Blueprint
from peptipedia.modules.database_models.database import Database
from sqlalchemy.orm import Session
from peptipedia.modules.utils import parse_response

db = Database()
session = Session()
download_blueprint = Blueprint("download_blueprint", __name__)

@download_blueprint.route("/get_activities_sources_list/", methods=["GET"])
def get_activities_sources_list():
    """Gets all activities and sources"""
    result = db.get_activities_sources_list()
    return parse_response(result)
