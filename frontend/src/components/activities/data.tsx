
import config from "../../config.json";
import DataTable from "../common/datatable";
import PieChart from "../plots/pie";
import Box from "@mui/material/Box";
import useGetTable from "../../hooks/useGetTable";

export default function Data() {
  const { table } = useGetTable(config.activities.table_api)

  return (
      <>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <DataTable table={table} title={"Activities"} redirect_api = {config.activities.redirect}></DataTable>
        </Box>
      </>
  );
}
