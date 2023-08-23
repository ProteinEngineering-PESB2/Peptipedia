import Form from "../components/search/form"
import DashboardLayout from "../components/common/dashboard_layout"
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import Box from "@mui/material/Box";
import Front from "../components/layout/front"

export default function AdvancedSearch() {
    const obj = {"title": "Advanced Search", "description": "XD"};
    useHandleSection({ section: "search" });
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