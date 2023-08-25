import { Grid, Paper, Box, Button, Divider } from "@mui/material";
import SliderForm from "./slider_form";
import axios from "axios";
import { useEffect, useState } from "react";
import SelectOptions from "./select_options";
import TextInput from "./text_input"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SequencesDataTable from "./sequences_datatable";
import config from "../../config.json"
export default function Form(){
  const [query, setQuery] = useState({})
  const [activities, setActivities] = useState({"name": []})
  const [physicochemical, setPhysicochemical] = useState({})
  const [count, setCount] = useState(undefined)
  const [showResults, setShowResults] = useState(false)
  const [show_physicochemical_params, setShowPhysicochemicalParams] = useState(false)


  const getParams = async () => {
    try {
      const response = await axios.get(config.search.params_api);
      setActivities(response.data.results.activities)
      setPhysicochemical(response.data.results.physicochemical_properties)
    } catch (error) {
      console.log(error);
    }
  };

  const search = async () =>{
    try{
      const response = await axios.post(config.search.count_api, query)
      setShowResults(true)
      setCount(response.data.results.count)
      
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    getParams();
  }, []);

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
            <Divider sx={{m:3}}>
              <Button onClick={()=>setShowPhysicochemicalParams(!show_physicochemical_params)}>
                {show_physicochemical_params
                ? <RemoveCircleOutlineIcon/>
                : <AddCircleOutlineIcon/> }
              </Button>
            </Divider>
            {(show_physicochemical_params) && (
              Object.keys(physicochemical).map((x)=>(
                <SliderForm label = {x}
                param_name = {x}
                params = {physicochemical[x]}
                query = {query}
                setQuery = {setQuery} />
                )
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
        table_api={config.search.search_api}
        redirect_api={config.search.redirect}/>)
      }
    </>
  )
}