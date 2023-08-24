import Form from "../components/blastp/form"
import DashboardLayout from "../components/common/dashboard_layout"
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import Box from "@mui/material/Box";
import Front from "../components/layout/front"

export default function Blast() {
    const obj = {"title": "Blastp", "description": "Execute blastp against peptipedia database"};
    useHandleSection({ section: "blast" });
    useLoadingComponent();
    return (
        <DashboardLayout>
        <>
            <Box sx={{ padding: 2 }}>
                <Front obj={obj}></Front>
            </Box>
            <Form></Form>
        </>
        </DashboardLayout>
    )
}