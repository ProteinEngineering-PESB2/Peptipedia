import config from "../../config.json";
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import useGetTable from "../../hooks/useGetTable";

export default function Data() {
  const {table } = useGetTable(config.sources.api)
  return (
    <>
      <Box sx={{ padding: 2 , cursor: "pointer"}}>
        <DataTable table={table} title={"Sources"}
        redirect_api = {config.sources.redirect}/>
      </Box>
    </>
  )
}
