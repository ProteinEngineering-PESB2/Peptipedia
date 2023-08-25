import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front"
import Data from "../components/activities/data"
import Box from "@mui/material/Box";
import config from "../config.json"
import CustomizedTreeView from "../components/activities/tree"
export default function Activities() {
  const obj = config.activities;
  useHandleSection({ section: "activities" });
  useLoadingComponent();

  return (
    <DashboardLayout>
      <>
        <Box sx={{ padding: 2 }}>
          <Front obj={obj}/>
        </Box>
        <Box sx={{ padding: 2}}>
          <CustomizedTreeView/>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Data/>
        </Box>
      </>
    </DashboardLayout>
  )
}