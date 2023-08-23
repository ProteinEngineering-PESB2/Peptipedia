"""Profile routes"""
from flask import Blueprint, request
from peptipedia.modules.database_models.database import Database
from sqlalchemy.orm import Session
from peptipedia.modules.utils import parse_response

db = Database()
session = Session()
search_blueprint = Blueprint("search_blueprint", __name__)

@search_blueprint.route("/get_peptide_params/", methods=["GET"])
def get_peptide_params():
    """Gets all go terms from a peptide"""
    result = db.get_peptide_params()
    return parse_response(result)

@search_blueprint.route("/get_count_search/", methods=["POST"])
def get_count_search():
    """Gets result count from query"""
    result = db.get_count_search(request.json)
    return parse_response(result)

@search_blueprint.route("/get_sequences_by_search/", methods=["POST"])
def get_sequences_by_search():
    """Gets result count from query"""
    result = db.get_sequences_by_search(request.json)
    return parse_response(result)