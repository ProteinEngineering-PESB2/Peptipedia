"""Home routes"""
from flask import Blueprint, request
from peptipedia.modules.procedure_models.alignment import BlastAlignment
from peptipedia.modules.utils import parse_response
blast_blueprint = Blueprint("blast_blueprint", __name__)

@blast_blueprint.route("/execute_blast/", methods=["POST"])
def execute_blast():
    """Gets count of peptides by activity"""
    try:
        data = request.json
        blast = BlastAlignment(data)
        res = blast.run_process()
        return parse_response(res)

    except Exception as e:
        print(e)