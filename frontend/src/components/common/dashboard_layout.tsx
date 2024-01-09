import { ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { Main } from "../layout/main";
import { DrawerHeader } from "../layout/drawer_header";
import Entities from "../layout/entities"
import Aside from "../layout/aside";
import Background from "/images/layout/fondo.jpg";
interface Props {
  children: ReactElement;
}
function DashboardLayout({ children}: Props) {
  return (<>
    <Box
      sx={{
        display: "flex",
        width: "100",
        height: "100%",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Aside />

      <Main open={true}>
        <DrawerHeader />
        {children}
        <Box sx={{ padding: 5 }}>
          <Entities></Entities>
        </Box>
      </Main>
    </Box>
    </>
  );
}

export default DashboardLayout;
