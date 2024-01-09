import { Box } from "@mui/material";

import config from "../../config.json"
export default function Diagram(){

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
            <img src={config.home.diagram_path} alt="diagram" width={800} />
        </Box>
    )
}