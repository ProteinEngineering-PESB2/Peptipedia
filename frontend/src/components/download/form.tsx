import { Paper, Box, Grid } from "@mui/material";
import axios from "axios";
import config from "../../config.json";
import BackdropComponent from "../common/backdrop";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Download from "../common/download";

export default function Form(){
  const [activities, setActivities] = useState([])
  const [sources, setSources] = useState([])

  const [selected_activity, setSelectedActivity] = useState<string>("")
  const [selected_source, setSelectedSource] = useState<string>("")

  const getParams = async () => {
    try {
      const response = await axios.get(config.download.api);
      setActivities(response.data.results.data.activities)
      setSources(response.data.results.data.sources)
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeActivity = (event: SelectChangeEvent) => {
    setSelectedActivity(event.target.value as string);
  };

  const handleChangeSource = (event: SelectChangeEvent) => {
    setSelectedSource(event.target.value as string);
  };

  useEffect(()=>{
    getParams()
  }, [])
  
  return (
    <>
      <BackdropComponent open={false}/>
      <Box margin={1} boxShadow={3}>
        <Paper sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <Box padding={3}>
        <Grid container spacing = {3}>
            <InputLabel id="activities">Activities</InputLabel>
            <Grid item xs={5}>
                <Select
                    labelId="activities-label"
                    id="activities-select"
                    value={selected_activity}
                    label="Activity"
                    fullWidth={true}
                    onChange={handleChangeActivity}
                >
                {activities.map((name)=>(
                    <MenuItem value={name}>{name}</MenuItem>
                ))}
                </Select>
            </Grid>
            <Grid item xs = {2}>
                <Download name={selected_activity} button_text="Download fasta by activity" format = ".fasta"></Download>
            </Grid>
            <Grid item xs = {2}>
                <Download name={selected_activity} button_text="Download csv by activity" format = ".csv"></Download>
            </Grid>
        </Grid>
        </Box>
        <Box padding={3}>
          <Grid container spacing={3}>
              <InputLabel id="sources">Sources</InputLabel>
              <Grid item xs={5}>
                  <Select
                      labelId="sources-label"
                      id="sources-select"
                      value={selected_source}
                      label="Sources"
                      fullWidth={true}
                      onChange={handleChangeSource}
                  >
                      {sources.map((name)=>(
                          <MenuItem value={name}>{name}</MenuItem>
                      ))}
                  </Select>
              </Grid>
              <Grid item xs={2}>
                  <Download name={selected_source} button_text="Download fasta by source" format = ".fasta" ></Download>
              </Grid>
              <Grid item xs={2}>
                  <Download name={selected_source} button_text="Download csv by source" format = ".csv" ></Download>
              </Grid>
          </Grid>
        </Box>
        <Box padding={1}>
          <Download name={"all_peptides"} button_text="Full download"></Download>
        </Box>
        </Paper>
      </Box>
      
    </>
  )
}