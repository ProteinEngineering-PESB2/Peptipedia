import os

downloads_folder = "./files/downloads"
blastdb_folder = "./files/blastdb"
static_folder = "./files/"
alignments_folder = "./files/alignments"

min_sequences = 1
max_sequences = 1
max_length = 150

select_limit = 300

user = os.environ.get("POSTGRES_USER", "peptiuser")
port = os.environ.get("POSTGRES_PORT", 5432)
host = os.environ.get("POSTGRES_HOST", "db")
db = os.environ.get("POSTGRES_DB", "peptipedia")
