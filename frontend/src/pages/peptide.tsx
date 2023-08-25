import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/peptide/front";
import Data from "../components/peptide/data";

export default function Peptide() {
  const { peptide_id } = useParams();
  const obj = {"title": "Peptide: " + peptide_id};
  

  useHandleSection({ section: "peptide" });
  useLoadingComponent();


  return (
    <DashboardLayout>
    <>
      <Box sx={{ padding: 2 }}>
        <Front obj={obj}/>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Data peptide_id = {peptide_id}/>
      </Box>
    </>
    </DashboardLayout>
  )
}