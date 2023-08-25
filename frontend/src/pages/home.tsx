import { useHandleSection } from "../hooks/useHandleSection";
import { Box } from "@mui/material";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Team from "../components/home/team";
import Links from "../components/home/links"
import Cite from "../components/home/cite"
import Data from "../components/home/data"
import Front from "../components/layout/front"
import config from "../config.json"

export default function Home() {
  const obj = config.home
  useHandleSection({ section: "home" });
  useLoadingComponent();

  return (
    <DashboardLayout>
      <>
        <Box sx={{ padding: 2 }}>
          <Front obj = {obj}/>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Data/>
        </Box>
        <Box sx={{ padding: 3, background: "#f5f5f5"}}>
          <Links/>
        </Box>

        <Box sx={{ padding: 3 }}>
          <Cite/>
        </Box>

        <Box sx={{ padding: 3, background: "#f5f5f5"}}>
          <Team/>
        </Box>
      </>
    </DashboardLayout>
  );
}
