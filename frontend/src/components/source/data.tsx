
import config from "../../config.json";
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import useGetTable from "../../hooks/useGetTable";
interface Props{
  source_id: string | undefined;
}

export default function Data({source_id}:Props) {
  const {table} = useGetTable(config.source.sequences_api + source_id)
  return (
      <>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <DataTable table={table} title={"Sequences"} redirect_api={config.source.redirect} ></DataTable>
        </Box>
      </>
  );
}
