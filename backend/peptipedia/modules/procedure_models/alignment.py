"""Blast alignment module"""
from re import split
import pandas as pd
import peptipedia.config as config
from Bio.Blast.Applications import NcbiblastpCommandline
import json
class BlastAlignment:
    """Alignment class, it performs a blast+ function for to align against Peptipedia Database"""

    def __init__(self, data):
        alignment_folder = config.alignments_folder
        alignment_file = "file.fasta"
        self.temp_file_path = f"{alignment_folder}/{alignment_file}"
        self.output_path = self.temp_file_path.replace(".fasta", ".out")
        self.fasta_text_to_file(data["fasta_text"])
        self.ids = []

    def fasta_text_to_file(self, fasta):
        with open(self.temp_file_path, mode="w", encoding="utf-8") as file:
            file.write(fasta)

    def __execute_blastp(self):
        """Execute blastp with an e-value 0.5, against Peptipedia database"""
        cline = NcbiblastpCommandline(db="files/blastdb/peptipedia.fasta", out=self.output_path, query= self.temp_file_path, outfmt="15")
        cline()

    def __parse_response(self):
        with open(self.output_path, "r", encoding="utf-8") as output_file:
            json_data = json.loads(output_file.read())
        try:
            id_query = json_data["BlastOutput2"][0]["report"]["results"]["search"]["query_title"]
            hits = json_data["BlastOutput2"][0]["report"]["results"]["search"]["hits"]
            data = []
            for hit in hits:
                for hsp in hit["hsps"]:
                    id_sbjct = hit["description"][0]["title"]
                    align_length = hsp["align_len"]
                    identity = hsp["identity"]
                    gaps = hsp["gaps"]
                    similarity = hsp["positive"]
                    row = {"id": id_sbjct}
                    row["bit_score"] = hsp["bit_score"]
                    row["e_value"] = hsp["evalue"]
                    row["length"] = align_length
                    row["identity"] = f"""{identity}/{align_length} ({
                        round(identity*100/align_length, 2)} %)"""
                    row["gaps"] = f"""{gaps}/{align_length} ({
                        round(gaps*100/align_length, 2)} %)"""
                    row["similarity"] = f"""{similarity}/{align_length} ({
                        round(similarity*100/align_length, 2)} %)"""
                    row["alignment"] = [
                        {
                            "id": 1,
                            "label": id_sbjct,
                            "sequence": hsp["qseq"],
                            "startIndex": hsp["hit_from"]
                            },
                        {
                            "id": 2,
                            "label": id_query,
                            "sequence": hsp["hseq"],
                            "startIndex": hsp["query_from"]
                            }
                    ]
                    data.append(row)
            return data
        except KeyError:
            return None

    def run_process(self):
        """Runs blastp full process"""
        self.__execute_blastp()
        res = self.__parse_response()
        if res is not None:
            return {"data": res}
        return {"error": "No significant results"}
