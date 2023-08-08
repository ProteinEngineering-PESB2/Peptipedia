import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import { Box } from "@mui/material";

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function LoadingComponent() {
  return (
    <Box
      width="100%"
      height="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <BarLoader color={"#2962ff"} css={override} loading={true} height={5}/>
    </Box>
  );
}
