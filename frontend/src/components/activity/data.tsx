
import config from "../../config.json";
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import useGetTable from "../../hooks/useGetTable";

interface Props{
  activity_id: string | undefined;
}

export default function Data({activity_id}:Props) {
  const {table} = useGetTable(config.activity.sequences_api + activity_id)
  return (
      <>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <DataTable table={table} title={"Sequences"} redirect_api = {config.activity.redirect} ></DataTable>
        </Box>
      </>
  );
}
