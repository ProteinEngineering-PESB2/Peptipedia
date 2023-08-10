import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front"
import Box from "@mui/material/Box";
import config from "../config.json"
import Data from "../components/sources/data"

export default function Sources() {
  const obj = config.sources;
  useHandleSection({ section: "sources" });
  useLoadingComponent();

  return (
  <DashboardLayout>
    <>
    <Box sx={{ padding: 2 }}>
      <Front obj={obj}></Front>
    </Box>
    <Box sx={{ padding: 2 }}>
      <Data></Data>
    </Box>
    </>
  </DashboardLayout>
  )
}