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

export default function Activity() {
  const [obj, setObj] = useState({});
  const [count, setCount] = useState(0)
  const { activity_id } = useParams();

  useHandleSection({ section: "activity" });
  useLoadingComponent();

  const getSpecificActivityData = async () => {
    try {
      const response = await axios.get(config.activity.api + activity_id);
      setObj({
        "title": "Activity: " + response.data.name,
        "description": response.data.description
      })
      setCount(response.data.count)
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
          <Front obj={obj}></Front>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Data activity_id={activity_id} count = {count}></Data>
        </Box>
      </>
    </DashboardLayout>
  )
}