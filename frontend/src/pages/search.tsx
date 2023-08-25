import Form from "../components/search/form"
import DashboardLayout from "../components/common/dashboard_layout"
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import config from "../config.json"
import Box from "@mui/material/Box";
import Front from "../components/layout/front"

export default function AdvancedSearch() {
    const obj = config.search
    useHandleSection({ section: "search" });
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