"""Blast alignment module"""
from re import split
import pandas as pd
from peptipedia.modules.utils import ConfigTool
from Bio.Blast.Applications import NcbiblastpCommandline

class BlastAlignment(ConfigTool):
    """Alignment class, it performs a blast+ function for to align against Peptipedia Database"""

    def __init__(self, data, is_file, config):
        super().__init__("blast", data, config, is_file)
        alignment_folder = config["folders"]["alignments_folder"]
        alignment_file = self.temp_file_path.replace(".fasta", ".align").split("/")[-1]
        self.output_path = f"{alignment_folder}/{alignment_file}"
        self.ids = []

    def execute_blastp(self):
        """Execute blastp with an e-value 0.5, against Peptipedia database"""
        cline = NcbiblastpCommandline(db="peptipedia.fasta", out=self.output_path, query= self.temp_file_path)
        cline()
        return self.output_path

    def parse_response(self):
        """Transforms blast+ output to data table"""
        with open(self.output_path, "r", encoding="utf-8") as output_file:
            res = output_file.read()
        # Specific zones in text.
        inicio = res.find("Value") + 7
        text = res[inicio:]
        fin = text.find("\n\n")
        text = text[:fin]
        # Splits text by lines.
        splitted = [row for row in text.splitlines() if row != ""]
        if len(splitted) <= 1:
            return {"status": "error", "description": "No significant results"}
        # Store alignment values in a list.
        data = []
        for row in splitted:
            row_splitted = [a for a in split(r"\s+", row) if a != ""]
            data.append(
                [row_splitted[0], float(row_splitted[-2]), float(row_splitted[-1])]
            )
        new_text = [
            row.strip() for row in res[inicio + fin :].split("\n>") if row.strip() != ""
        ]
        # Store values in a dataframe
        blast_dataframe = pd.DataFrame(data, columns=["id", "score", "e_value"])
        for index, row in enumerate(new_text):
            details_text = row[row.find("Identities =") : row.find("\n\nQuery")]
            row_details = []
            for detail in details_text.split(","):
                percentaje = detail[detail.find("(") + 1 : -1]
                row_details.append(float(percentaje.replace("%", "")) / 100)
            blast_dataframe.loc[index, "identity"] = row_details[0]
            blast_dataframe.loc[index, "similarity"] = row_details[1]
            blast_dataframe.loc[index, "gaps"] = row_details[2]
        self.ids = blast_dataframe.id.tolist()
        return {
            "status": "success",
            "data": blast_dataframe.values.tolist(),
            "columns": blast_dataframe.columns.tolist(),
        }

    def get_alignments(self):
        """Function parses all the alignments and returns as json"""
        with open(self.output_path, "r", encoding="utf-8") as file:
            res = file.read()
        id_query = res.split("Query= ")[1].split(" ")[0]
        splitted = res.split(">")
        response = {}
        for id_label, j in zip(self.ids, splitted[1:]):
            inicio = j.find("Query")
            row = j[inicio:]
            query = "".join(
                [split(r"\s+", q)[2] for q in row.split("\n") if "Query" in q]
            )
            sbjct = "".join(
                [split(r"\s+", sb)[2] for sb in row.split("\n") if "Sbjct" in sb]
            )
            response[id_label] = [
                {"id": 1, "label": id_label, "sequence": sbjct},
                {"id": 2, "label": id_query, "sequence": query},
            ]
        return response