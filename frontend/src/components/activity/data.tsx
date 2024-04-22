
import config from "../../config.json";
import SequencesDataTable from "../common/sequences_datatable";
import Box from "@mui/material/Box";

interface Props{
  activity_id: string | undefined;
  count: number;
  predicted_count: number;
}

export default function Data({activity_id, count, predicted_count}:Props) {
  const table_api = config.activity.sequences_api + activity_id
  return (
      <>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <SequencesDataTable count = {count} title={"Labeled sequences"}
          redirect_api = {config.activity.redirect}
          table_api={config.activity.sequences_api + activity_id}/>

        </Box>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <SequencesDataTable count = {predicted_count} title={"Predicted sequences"}
          redirect_api = {config.activity.redirect}
          table_api={config.activity.predicted_sequences_api + activity_id}/>
        </Box>
      </>
  );
}
