import os


downloads_folder = "./files/downloads"
blastdb_folder = "./files/blastdb"
static_folder = "./files/"
alignments_folder = "./files/alignments"

min_sequences = 1
max_sequences = 1
max_length = 150

select_limit = 300

user =os.environ["DB_USER"]
db = "peptipedia"
host = os.environ["DB_HOST"]
port = os.environ["DB_PORT"]
prod = eval(os.environ["PROD"])
