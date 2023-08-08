import axios from "axios";
import config from "../../config.json";
import DataTable from "../common/datatable";
import { useState, useEffect } from "react";
import CardsList from "./cards_list"
import { Box} from "@mui/material";
export default function Data() {
    const [data, setData] = useState({});
    const getHomeData = async () => {
        try {
          const response = await axios.get(config.home.api);
          setData(response.data.results);
        } catch (error) {
            console.log(error);
            setData({});
        }
      };

    useEffect(() => {
        getHomeData();
    }, []);

  return (
    <>
      <Box padding={3}>
        <CardsList general_table={data.general_table} ></CardsList>
        <DataTable table={data.peptides_table} title={"General peptides information"} > </DataTable>
      </Box>
    </> 
  );
}
