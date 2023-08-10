import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import axios from "axios";
import config from "../config.json"
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front";
import { useState, useEffect } from "react";
import Data from "../components/source/data";

export default function Source() {
    const [obj, setObj] = useState({});
    const { source_id } = useParams();
  
    useHandleSection({ section: "source" });
    useLoadingComponent();


    const getSpecificSourceData = async () => {
        try {
          const response = await axios.get(config.source.api + source_id);
          setObj({
            "title": "Source: " + response.data.name,
            "description": response.data.description
          })
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
        getSpecificSourceData();
    }, []);

    return (
        <DashboardLayout>
        <>
            <Box sx={{ padding: 2 }}>
                <Front obj={obj}></Front>
            </Box>
            <Box sx={{ padding: 2 }}>
            <Data source_id={source_id}></Data>
            </Box>
        </>
        </DashboardLayout>
    )
}