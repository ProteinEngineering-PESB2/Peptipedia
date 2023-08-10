import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";

import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front";
import { useState, useEffect } from "react";

export default function Peptide() {
    const [obj, setObj] = useState({});
    const { peptide_id } = useParams();
  
    useHandleSection({ section: "peptide" });
    useLoadingComponent();
    return (
        <DashboardLayout>
        <>
            <Box sx={{ padding: 2 }}>
                {/* <Front obj={obj}></Front> */}
                <h1>{peptide_id}</h1>
            </Box>
        </>
        </DashboardLayout>
    )
}