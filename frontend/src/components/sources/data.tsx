import config from "../../config.json";
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import BarChart from "../plots/bar";
import useGetTableAndBarchart from "../../hooks/useGetTableAndBarchart";

export default function Data() {
  const {table, plot } = useGetTableAndBarchart(config.sources.api)
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <BarChart plot={plot} title={"Sources"} ></BarChart>
      </Box>
      <Box sx={{ padding: 2 , cursor: "pointer"}}>
        <DataTable table={table} title={"Sources"} redirect_api = {config.sources.redirect} ></DataTable>
      </Box>
    </>
  )
}
