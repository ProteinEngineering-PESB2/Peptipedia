
import config from "../../config.json";
import PieChart from "../plots/pie";
import Box from "@mui/material/Box";
import useGetBarchart from "../../hooks/useGetBarchart";

export default function Plot() {
  const { plot } = useGetBarchart(config.activities.plot_api)

  return (
      <>
         <Box >
          <PieChart plot={plot} title={"Activities"} ></PieChart>
        </Box>  
      </>
  );
}
