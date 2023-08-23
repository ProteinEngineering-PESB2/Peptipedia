import { Grid, Paper, Box, Button } from "@mui/material";
import SliderForm from "./slider_form";
import axios from "axios";
import { useEffect, useState } from "react";
import SelectOptions from "./select_options";
import TextInput from "./text_input"
import SequencesDataTable from "./sequences_datatable";

export default function Form(){
  const [query, setQuery] = useState({})
  const [results_display, setResultsDisplay] = useState(<></>)
  const [activities, setActivities] = useState({"name": []})
  const [physicochemical, setPhysicochemical] = useState({})
  const [count, setCount] = useState(undefined)
  const [showResults, setShowResults] = useState(false)
  const getParams = async () => {
    try {
      const response = await axios.get("/api/get_peptide_params/");
      setActivities(response.data.results.activities)
      setPhysicochemical(response.data.results.physicochemical_properties)
    } catch (error) {
      console.log(error);
    }
  };

  const search = async () =>{
    try{
      const response = await axios.post("/api/get_count_search/", query)
      setShowResults(true)
      setCount(response.data.results.count)
      
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    getParams();
  }, []);
  
  useEffect(()=>{
  }, [count])

  return (
    <>
      <Grid item xs={12} sm={12} md={9} lg={12} xl={4}>
        <Box margin={1} boxShadow={3}>
          <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
            <TextInput
              setQuery = {setQuery}
              query = {query}/>
            <SelectOptions
              options = {activities}
              setQuery = {setQuery}
              query = {query}/>
              {Object.keys(physicochemical).map((x)=>(
                <SliderForm label = {x}
                param_name = {x}
                params = {physicochemical[x]}
                query = {query}
                setQuery = {setQuery} />
                )
              )}
          </Paper>
        </Box>
      </Grid>
      <Button variant="contained" sx={{m:1}} onClick = {() => search()} >Search</Button>
      {(showResults===true)&& (
      <SequencesDataTable title ="Results"
        count = {count}
        query = {query}
        table_api="/api/get_sequences_by_search/"
        redirect_api="/peptide/"/>)
      }
    </>
  )
}