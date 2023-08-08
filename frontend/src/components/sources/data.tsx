import axios from "axios";
import config from "../../config.json";
import DataTable from "../common/datatable";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BarChart from "../plots/bar";

export default function Data() {
    const [data, setData] = useState({});
    const getActivitiesData = async () => {
        try {
          const response = await axios.get(config.sources.api);
          setData(response.data);
        } catch (error) {
            setData({});
        }
      };

    useEffect(() => {
        getActivitiesData();
    }, []);

  return (

    <>
      <Box sx={{ padding: 2 }}>
        <BarChart x={data.x} y={data.y} title={"Sources"} ></BarChart>
      </Box>
      <Box sx={{ padding: 2 }}>
        <DataTable table={data} title={"Sources"} ></DataTable>
      </Box>
    </>
  );
}
