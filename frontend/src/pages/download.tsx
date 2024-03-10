import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front"
import Box from "@mui/material/Box";
import config from "../config.json"
import Form from "../components/download/form";

export default function DownloadPage() {
  const obj = config.download;
  useHandleSection({ section: "download" });
  useLoadingComponent();

  return (
  <DashboardLayout>
    <>
    <Box sx={{ padding: 2 }}>
      <Front obj={obj}/>
    </Box>

    <Form/>
    </>
  </DashboardLayout>
  )
}