import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/common/dashboard_layout";
import Data from "../components/peptide/data";
export default function Peptide() {
  const { peptide_id } = useParams();
  useHandleSection({ section: "peptide" });
  useLoadingComponent();
  
  return (
    <DashboardLayout>
    <>
      <Box sx={{ padding: 2 }}>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Data peptide_id = {peptide_id}/>
      </Box>
    </>
    </DashboardLayout>
  )
}