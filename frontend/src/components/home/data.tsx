import axios from "axios";
import config from "../../config.json";
import DataTable from "../common/datatable";
import { useState, useEffect } from "react";
import CardsList from "./cards_list"
import { Box} from "@mui/material";

export default function Data() {
    const [general_table, setGeneralTable] = useState([])
    const [table, setTable] = useState({"data": [], "columns": []})
    const getHomeData = async () => {
        try {
          const response = await axios.get(config.home.api);
          setGeneralTable(response.data.results.general_table)
          setTable(response.data.results.peptides_table)
        } catch (error) {
            console.log(error);
        }
      };

    useEffect(() => {
        getHomeData();
    }, []);

  return (
    <>
      <Box padding={3}>
        <CardsList general_table={general_table} ></CardsList>
        <DataTable table={table} title={"General peptides information"}></DataTable>
      </Box>
    </> 
  );
}
