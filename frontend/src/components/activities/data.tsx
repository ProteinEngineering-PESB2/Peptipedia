
import config from "../../config.json";
import DataTable from "../common/datatable";
import Box from "@mui/material/Box";
import useGetTable from "../../hooks/useGetTable";
import { Container, Typography } from "@mui/material";
export default function Data() {
  const { table } = useGetTable(config.activities.table_api)

  return (
      <>
        <Container
          sx={{ textAlign: "justify" }}
          maxWidth="lg"
          >
          <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
              {config.activities.description_2}
          </Typography>
        </Container>
        <Box sx={{ padding: 2 , cursor: "pointer"}}>
          <DataTable table={table} title={"List of activities"} redirect_api = {config.activities.redirect}></DataTable>
        </Box>
      </>
  );
}
