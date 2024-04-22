import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front"
import {Box, Grid} from "@mui/material";
import config from "../config.json"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Data from "../components/activity/data"
import Download from "../components/common/download";

export default function Activity() {
  const [obj, setObj] = useState({});
  const { activity_id } = useParams();
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  const [predicted_count, setPredictedCount] = useState(0)
  useHandleSection({ section: "activity" });
  useLoadingComponent();

  const getSpecificActivityData = async () => {
    try {
      const response = await axios.get(config.activity.api + activity_id);
      setObj({
        "title": "Activity: " + response.data.results.name,
        "description": response.data.results.description + "\n" + config.activity.description
      })
      setCount(response.data.results.count)
      setName(response.data.results.name + ".fasta")
      setPredictedCount(response.data.results.predicted_count)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecificActivityData();
  }, []);
  return (
    <DashboardLayout>
      <>
        <Box sx={{ padding: 2 }}>
          <Front obj={obj}/>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Data activity_id={activity_id} count = {count} predicted_count={predicted_count}/>
        </Box>
        <Box sx={{ paddingRight: 4 }}>
          <Grid container justifyContent="flex-end">
            <Download name={name}/>
          </Grid>
        </Box>
      </>
    </DashboardLayout>
  )
}