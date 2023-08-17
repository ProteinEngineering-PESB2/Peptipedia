import Form from "../components/search/form"
import DashboardLayout from "../components/common/dashboard_layout"
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
export default function AdvancedSearch() {

    useHandleSection({ section: "search" });
    useLoadingComponent();
    return (
        <DashboardLayout>
        <>
            <Form></Form>
        </>
        </DashboardLayout>
    )
}