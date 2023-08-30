import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Front from "../components/layout/front"
import Box from "@mui/material/Box";
import config from "../config.json"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Data from "../components/activity/data"
import Download from "../components/common/download";

export default function Activity() {
  const [obj, setObj] = useState({});
  const [count, setCount] = useState(0)
  const { activity_id } = useParams();
  const [name, setName] = useState("")
  useHandleSection({ section: "activity" });
  useLoadingComponent();

  const getSpecificActivityData = async () => {
    try {
      const response = await axios.get(config.activity.api + activity_id);
      setObj({
        "title": "Activity: " + response.data.results.name,
        "description": response.data.results.description
      })
      setCount(response.data.results.count)
      setName(response.data.results.name)
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
          <Data activity_id={activity_id} count = {count}/>
        </Box>
        <Box sx={{ paddingRight: 4 }}>
          <Download name={name}/>
        </Box>
      </>
    </DashboardLayout>
  )
}