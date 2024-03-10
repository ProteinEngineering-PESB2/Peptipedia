import { TextField, FormControl, Button, Paper, Box, Grid} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import AlignmentSequenceResult from "./result";
import BackdropComponent from "../common/backdrop";

export default function Form() {

  const [is_waiting, setIsWaiting] = useState(false)
  const [fasta_text, setFastaText] = useState("")
  const [results, setResults] = useState([])
  const [display_results, setDisplayResults] = useState(false)
  const run_blast = async ()=>{
    try {
        setIsWaiting(true)
        setDisplayResults(false)
        const response = await axios.post("/api/execute_blast/", {"fasta_text": fasta_text})
        setResults(response.data.results.data)
        setDisplayResults(true)
        setIsWaiting(false)
    } catch (error){
        console.log(error)
    }
  }
  
  return (
  <>
  <BackdropComponent open = {is_waiting}/>
  <Grid item xs={12} sm={12} md={9} lg={12} xl={4}>
    <Box margin={1} boxShadow={3}>
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <TextField
          label="Fasta Sequence"
          value={fasta_text}
          multiline
          rows={11}
          onChange={(event)=>{
            setFastaText(event.target.value)
          }}
          fullWidth
        />
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <Button
            type="submit" variant="contained"
            sx={{ width: { xl: "12rem", lg: "12rem", md: "12rem", sm: "12rem", xs: "100%" },
            backgroundColor: "#2962ff", ":hover": { backgroundColor: "#3A6CF6" }}}
            size="medium" onClick={()=>run_blast()}> BLAST </Button>
        </FormControl>
      </Paper>
    </Box>
  </Grid>
  {(display_results)&&(
    <AlignmentSequenceResult results = {results}></AlignmentSequenceResult>
  )}
  </>
  );
}