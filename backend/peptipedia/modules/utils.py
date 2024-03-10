"""Config utilities"""
import os
from peptipedia.modules.database_models.database import Database
import peptipedia.config as config
from flask import make_response
class Folders:
    def create_folders(self):
        # create folders
        os.makedirs("./files/", exist_ok=True)
        os.makedirs(config.static_folder, exist_ok=True)
        os.makedirs(config.blastdb_folder, exist_ok=True)
        os.makedirs(config.downloads_folder, exist_ok=True)
        os.makedirs(config.alignments_folder, exist_ok=True)
        
        db = Database()
        #db.create_fasta_from_peptides()
        #db.create_downloads()
        #self.makeblastdb()

    def get_static_folder(self):
        return config.static_folder
    
    def makeblastdb(self):
        os.system(f"""makeblastdb -in {config.blastdb_folder}/peptipedia.fasta -dbtype prot""")
        print("creado")
        
def parse_response(res):
    """Parse response and return results"""
    if isinstance(res, (list, dict)):
        if len(res) != 0:
            return make_response({"results": res}, 200)
        return make_response({"description": "Not Found"}, 404)
    return make_response({"description": res}, 500)
