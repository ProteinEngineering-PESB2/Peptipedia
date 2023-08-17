"""Profile routes"""
from flask import Blueprint, request
from peptipedia.modules.database_models.database import Database
from sqlalchemy.orm import Session
db = Database()
session = Session()
profile_blueprint = Blueprint("profile_blueprint", __name__)

###Profile
@profile_blueprint.route("/get_peptide/<idpeptide>", methods=["GET"])
def get_peptide(idpeptide):
    """Gets all go terms from a peptide"""
    result = db.get_peptide(idpeptide)
    return {"result": result}
