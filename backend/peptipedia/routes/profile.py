"""Profile routes"""
import configparser

from flask import Blueprint

from peptipedia.modules.database_models.database import Database
#from peptipedia.modules.database_models.structure import Structure

##Reads config file and asign folder names.
config = configparser.ConfigParser()
config.read("config.ini")

db = Database(config)

profile_blueprint = Blueprint("profile_blueprint", __name__)

###Profile
@profile_blueprint.route("/get_go_from_peptide/<idpeptide>", methods=["GET"])
def api_get_go_from_peptide(idpeptide):
    """Gets all go terms from a peptide"""
    result = db.get_go_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_pfam_from_peptide/<idpeptide>", methods=["GET"])
def api_get_pfam_from_peptide(idpeptide):
    """Gets all pfam terms from a peptide"""
    result = db.get_pfam_from_peptide(idpeptide)
    return {"result": result}

@profile_blueprint.route("/get_info_from_peptide/<idpeptide>", methods=["GET"])
def api_get_info_from_peptide(idpeptide):
    """Gets all properties from a peptide"""
    result = db.get_info_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_act_from_peptide/<idpeptide>", methods=["GET"])
def api_get_act_from_peptide(idpeptide):
    """Gets all activities from a peptide"""
    result = db.get_act_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_patent_from_peptide/<idpeptide>", methods=["GET"])
def api_get_patent_from_peptide(idpeptide):
    """Gets all patents from a peptide"""
    result = db.get_patent_from_peptide(idpeptide)
    return {"result": result}


@profile_blueprint.route("/get_db_from_peptide/<idpeptide>", methods=["GET"])
def api_get_db_from_peptide(idpeptide):
    """Gets all databases from a peptide"""
    result = db.get_db_from_peptide(idpeptide)
    return {"result": result}

""" 
@profile_blueprint.route("/get_structure/<idpeptide>", methods=["GET"])
def api_get_structure(idpeptide):
    "Try to get a structure for specific peptide"
    struct_obj = Structure(config["folders"]["static_folder"])
    result = struct_obj.get_structure(db, idpeptide, config)
    return result
 """

@profile_blueprint.route("/get_structural_analysis/<idpeptide>", methods=["GET"])
def api_get_structural_analysis(idpeptide):
    """Gets all structural analysis from a peptide"""
    result = db.get_structural_analysis(idpeptide)
    return {"result": result}
