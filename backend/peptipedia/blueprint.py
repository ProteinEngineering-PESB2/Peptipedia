"""Api Blueprints"""
from flask import Blueprint
from peptipedia.routes.search import search_blueprint
from peptipedia.routes.home import home_blueprint
from peptipedia.routes.activities import activities_blueprint
from peptipedia.routes.sources import sources_blueprint
from peptipedia.routes.profile import profile_blueprint

api_blueprint = Blueprint("api", __name__)
api_blueprint.register_blueprint(home_blueprint)
api_blueprint.register_blueprint(search_blueprint)
api_blueprint.register_blueprint(activities_blueprint)
api_blueprint.register_blueprint(sources_blueprint)
api_blueprint.register_blueprint(profile_blueprint)
