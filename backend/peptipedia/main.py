"""main module"""
import os
from flask import Flask
from flask_cors import CORS
from peptipedia.blueprint import api_blueprint
from peptipedia.modules.utils import Folders
import peptipedia.config as config

f = Folders()
f.create_folders()

app = Flask(__name__, static_folder=os.path.realpath(config.static_folder))
# Cors
CORS(app)

app.register_blueprint(api_blueprint, url_prefix="/api")
if __name__ == "__main__":
    app.run(debug=os.environ["DEBUG"], host="0.0.0.0", port=8002)
