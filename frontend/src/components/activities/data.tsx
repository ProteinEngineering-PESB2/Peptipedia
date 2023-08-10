
import config from "../../config.json";
import DataTable from "../common/datatable";
import BarChart from "../plots/bar";
import Box from "@mui/material/Box";
import useGetTableAndBarchart from "../../hooks/useGetTableAndBarchart";

export default function Data() {
  const {table, plot } = useGetTableAndBarchart(config.activities.api)

  return (
      <>
        <Box >
          <BarChart plot={plot} title={"Activities"} ></BarChart>
        </Box> 
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <DataTable table={table} title={"Activities"} redirect_api = {config.activities.redirect}></DataTable>
        </Box>
      </>
  );
}
