import { Grid, Paper, Box, Button, Divider } from "@mui/material";
import SliderForm from "./slider_form";
import axios from "axios";
import { useEffect, useState } from "react";
import SelectOptions from "./select_options";
import TextInput from "./text_input"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SequencesDataTable from "./sequences_datatable";
import config from "../../config.json";
import Check from "./canon";
import BackdropComponent from "../common/backdrop";
export default function Form(){
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState({})
  const [activities, setActivities] = useState({"name": []})
  const [physicochemical, setPhysicochemical] = useState({})
  const [count, setCount] = useState(undefined)
  const [showResults, setShowResults] = useState(false)
  const [show_physicochemical_params, setShowPhysicochemicalParams] = useState(false)
  const [is_waiting, setIsWaiting] = useState(false)
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
      setIsWaiting(true)
      const response = await axios.post(config.search.count_api, query)
      setShowResults(true)
      setCount(response.data.results.count)
      setPage(0)
      setIsWaiting(false)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    getParams();
  }, []);
  return (
    <>
      <BackdropComponent open={is_waiting}/>
      <Box margin={1} boxShadow={3}>
        <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
          <TextInput
            label = "sequence"
            form_label = "Sequence"
            setQuery = {setQuery}
            query = {query}
            rows = {4}/>
          <TextInput
            label = "swissprot_id"
            form_label = "Swissprot ID"
            setQuery = {setQuery}
            query = {query}
            rows = {1}/>
          <SelectOptions
            options = {activities}
            setQuery = {setQuery}
            query = {query}/>

          <Check setQuery = {setQuery} query = {query}/>

          <Divider sx={{m:3}}>
            <Button onClick={()=>setShowPhysicochemicalParams(!show_physicochemical_params)}>
              {show_physicochemical_params
              ? <RemoveCircleOutlineIcon color = "info"/>
              : <AddCircleOutlineIcon  color = "info" /> }
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
          <Button variant="contained" sx={{m:1 ,width: { xl: "12rem", lg: "12rem", md: "12rem", sm: "12rem", xs: "100%" },}} onClick = {() => search()} >Search</Button>
        </Paper>
        
      </Box>
      
      {(showResults === true)&& (
        <Box margin={1} boxShadow={3} sx= {{cursor: "pointer"}}>
          <SequencesDataTable title ="Results"
            page = {page}
            setPage = {setPage}
            count = {count}
            query = {query}
            table_api={config.search.search_api}
            redirect_api={config.search.redirect}/>
        </Box>
      )
      }
    </>
  )
}