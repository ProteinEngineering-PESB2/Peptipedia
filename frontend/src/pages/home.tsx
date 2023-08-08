import { useHandleSection } from "../hooks/useHandleSection";
import { Box } from "@mui/material";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Team from "../components/home/team";
import Links from "../components/home/links"
import Cite from "../components/home/cite"
import Entities from "../components/common/entities"
import Data from "../components/home/data"
import Front from "../components/common/front"
import config from "../config.json"

export default function Home() {
  useHandleSection({ section: "home" });
  useLoadingComponent();

  return (
    <DashboardLayout>
      <>
        <Box sx={{ padding: 2 }}>
          <Front obj = {config.home}></Front>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Data></Data>
        </Box>

        <Box sx={{ padding: 3, background: "#f5f5f5"}}>
          <Links></Links>
        </Box>

        <Box sx={{ padding: 5 }}>
          <Cite></Cite>
        </Box>

        <Box sx={{ padding: 5, background: "#f5f5f5"}}>
          <Team></Team>
        </Box>
      </>
    </DashboardLayout>
  );
}
