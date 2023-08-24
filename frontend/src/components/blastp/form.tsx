import { TextField, FormControl, Button, Paper, Box, Grid} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import AlignmentSequenceResult from "./result";

export default function Form() {
  const [fasta_text, setFastaText] = useState("")
  const [results, setResults] = useState([])
  const run_blast = async ()=>{
    try {
        const response = await axios.post("/api/execute_blast/", {"fasta_text": fasta_text})
        setResults(response.data.results.data)
    } catch (error){
        console.log(error)
    }
  }
  useEffect(()=>{
    console.log(results.length)
  }, [results])
  
  return (
  <>
  <Grid item xs={12} sm={12} md={9} lg={12} xl={4}>
    <Box margin={1} boxShadow={3}>
      <Paper sx={{ p: 4, display: "flex", flexDirection: "column" }}>
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
  {(results.length > 0)&&(
    <AlignmentSequenceResult results = {results}></AlignmentSequenceResult>
  )}
  </>
  );
}