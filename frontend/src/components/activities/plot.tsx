
import config from "../../config.json";
import PieChart from "../plots/pie";
import Box from "@mui/material/Box";
import useGetBarchart from "../../hooks/useGetBarchart";
import { Container, Typography } from "@mui/material";

export default function Plot() {
  const { plot } = useGetBarchart(config.activities.plot_api)

  return (
      <>
        <Box padding={1}>
          <Container
            sx={{ textAlign: "justify" }}
            maxWidth="lg"
            >
            <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
                {config.activities.description_3}
            </Typography>
          </Container>
        </Box>
         <Box padding={1}>
          <PieChart plot={plot} title={"Activities"} ></PieChart>
        </Box>
      </>
  );
}
