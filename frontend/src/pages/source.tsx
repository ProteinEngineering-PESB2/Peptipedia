import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import axios from "axios";
import config from "../config.json"
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/source/front";
import { useState, useEffect } from "react";
import Data from "../components/source/data";
import Download from "../components/common/download";
import RedirectButton from "../components/source/button";
import { Grid } from "@mui/material";

export default function Source() {
    const [obj, setObj] = useState({});
    const {source_id} = useParams();
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    useHandleSection({ section: "source" });
    useLoadingComponent();

    const getSpecificSourceData = async () => {
        try {
          const response = await axios.get(config.source.api + source_id);
          setObj({"title": "Source: " + response.data.results.name, "description": config.source.description})
          setCount(response.data.results.count);
          setName(response.data.results.name + ".fasta")
          setURL(response.data.results.url)
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
                <Front obj={obj}/>
            </Box>
            <Box sx={{ paddingRight: 4 }}>
                <RedirectButton url={url}/>
            </Box>
            <Box sx={{ padding: 2 }}>
                <Data source_id={source_id} count={count}/>
            </Box>
            <Box sx={{ paddingRight: 4 }}>
                <Grid container justifyContent="flex-end">
                    <Download name={name} button_text="Download sequences"/>
                </Grid>
            </Box>
        </>
        </DashboardLayout>
    )
}