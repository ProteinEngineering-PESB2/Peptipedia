
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json"
import PeptideSequence from "./sequence"
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import Activities from "./activities";
import Structure from "./structure";
interface Props{
    peptide_id: string;
}
export default function Data({peptide_id}: Props) {
    const [sequence, setSequence] = useState("")
    const [table, setTable] = useState({"data": [], "columns": []})
    const [activities, setActivities] = useState([])
    const getSpecificPeptideData = async () => {
      try {
        const response = await axios.get(config.peptide.api + peptide_id);
        setSequence(response.data.results.peptide.sequence)
        setTable(response.data.results.peptide.physicochemical_properties.table)
        setActivities(response.data.results.peptide.activities)
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSpecificPeptideData();
    }, []);
  
    return (
      <>
        <Box sx={{ padding: 2 }}>
          <PeptideSequence sequence = {sequence}/>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Activities activities={ activities }/>
        </Box>
        <Box sx={{padding: 2}}>
          <DataTable title={"Physicochemical Properties"} table={table}/>
        </Box>
      </>
    )
  }