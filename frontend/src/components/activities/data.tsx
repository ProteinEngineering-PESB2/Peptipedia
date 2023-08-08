import axios from "axios";
import config from "../../config.json";
import DataTable from "../common/datatable";
import { useState, useEffect } from "react";
import BarChart from "../plots/bar";
import Box from "@mui/material/Box";

export default function Data() {
    const [data, setData] = useState(undefined);
    const getActivitiesData = async () => {
        try {
          const response = await axios.get(config.activities.api);
          setData(response.data);
        } catch (error) {
            setData(undefined);
        }
      };

    useEffect(() => {
        getActivitiesData();
    }, []);

  return (
    (data !== undefined)&&
    (
      <>
        <Box >
          <BarChart x={data.plot.x} y={data.plot.y} title={"Activities"} ></BarChart>
        </Box>
        <Box sx={{ padding: 2 }}>
          <DataTable table={data.table} title={"Activities"} ></DataTable>
        </Box>
      </>
    )
  );
}
