import { ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Main } from "../layout/main";
import { DrawerHeader } from "./drawer_header";
import Entities from "./entities"
import Aside from "../layout/aside";

interface Props {
  children: ReactElement;
}

function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100",
        height: "100%",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <CssBaseline />

      <Aside handleDrawerClose={handleDrawerClose} open={open} />

      <Main open={open}>
        <DrawerHeader />
        {children}
        <Box sx={{ padding: 5 }}>
          <Entities></Entities>
        </Box>
      </Main>
    </Box>
  );
}

export default DashboardLayout;
