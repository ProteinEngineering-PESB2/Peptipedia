"""Profile routes"""

from flask import Blueprint
from sqlalchemy.orm import Session

from peptipedia.modules.database_models.database import Database
from peptipedia.modules.utils import parse_response

db = Database()
session = Session()
profile_blueprint = Blueprint("profile_blueprint", __name__)


###Profile
@profile_blueprint.route("/get_peptide/<idpeptide>", methods=["GET"])
def get_peptide(idpeptide):
    """Gets all go terms from a peptide"""
    result = db.get_peptide(idpeptide)
    return parse_response(result)


###Profile
@profile_blueprint.route("/get_enrichment/<idpeptide>", methods=["GET"])
def get_enrichment(idpeptide):
    """Gets all go terms from a peptide"""
    result = db.get_enrichment(idpeptide)
    return parse_response(result)
