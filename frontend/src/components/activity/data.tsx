
import config from "../../config.json";
import SequencesDataTable from "../common/sequences_datatable";
import Box from "@mui/material/Box";

interface Props{
  activity_id: string | undefined;
}

export default function Data({activity_id}:Props) {
  const table_api = config.activity.sequences_api + activity_id
  return (
      <>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <SequencesDataTable count = {1000} title={"Sequences"}
          redirect_api = {config.activity.redirect}
          table_api={table_api}></SequencesDataTable>
        </Box>
      </>
  );
}
