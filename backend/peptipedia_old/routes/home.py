"""Home routes"""

from flask import Blueprint
from sqlalchemy.orm import Session

from peptipedia.modules.database_models.database import Database
from peptipedia.modules.utils import parse_response

db = Database()
session = Session()
home_blueprint = Blueprint("home_blueprint", __name__)


@home_blueprint.route("/get_home_statistics/", methods=["GET"])
def api_get_home_statistics():
    try:
        res = db.get_home_statistics()
        return parse_response(res)
    except Exception as e:
        print(e)
        session.rollback()
