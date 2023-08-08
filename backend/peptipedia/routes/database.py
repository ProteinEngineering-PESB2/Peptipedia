"""Database routes"""
from flask import Blueprint
from sqlalchemy.orm import Session
from peptipedia.modules.database_models.database import Database
from peptipedia.modules.utils import parse_response
database_blueprint = Blueprint("database_blueprint", __name__)

db = Database()
session = Session()

@database_blueprint.route("/get_home_statistics/", methods=["GET"])
def api_get_home_statistics():
    res = db.get_home_statistics()
    return parse_response(res)

