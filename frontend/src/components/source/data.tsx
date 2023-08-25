import config from "../../config.json";
import SequencesDataTable from "../common/sequences_datatable";
import Box from "@mui/material/Box";

interface Props{
  source_id: string | undefined;
  count: number
}

export default function Data({source_id, count}:Props) {
  const table_api = config.source.sequences_api + source_id
  return (
      <>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <SequencesDataTable title={"Sequences"} count={count}
          table_api = {table_api} redirect_api={config.source.redirect}/>
        </Box>
      </>
  );
}
