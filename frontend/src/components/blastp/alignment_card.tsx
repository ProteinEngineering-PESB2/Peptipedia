import useProSeqViewer, { Alignment } from "../../hooks/useProSeqViewer";
import { Box, Grid, Paper, Card } from "@mui/material";
export interface AlignmentSequenceCardProps {
  id: string;
  bit_score: number;
  e_value: number;
  gaps: string;
  identity: string;
  length: number;
  similarity: string;
  alignment: Alignment[];
  index: number;
}

function AlignmentSequenceCard({
  bit_score,
  e_value,
  gaps,
  id,
  identity,
  length,
  similarity,
  alignment,
  index,
}: AlignmentSequenceCardProps) {
  useProSeqViewer({
    alignments: alignment,
    divId: `psv-${index}`,
    sequenceColor: "blosum62",
  });
  const clickFunction = () =>{
    window.open("/peptide/" + id)
  }
  return (
    <>
    <Card variant="outlined" sx={{margin:2}}>
      <Box m={1} sx={{p:2, cursor: "pointer"}} onClick={clickFunction} >
        <Grid container>
          <Grid xs={12} sm={12} md = {12}>
            <strong>Id: </strong> {id}
          </Grid>
          <Grid xs={12} sm={6} md = {3}>
            <strong>Length: </strong>
            {length}
          </Grid>
          <Grid xs={12} sm={6} md = {3}>
            <strong>Bit Score: </strong>
            {bit_score}
          </Grid>
          <Grid xs={12} sm={6} md = {3}>
            <strong>E-Value: </strong>
            {e_value}
          </Grid>
          <Grid xs={12} sm={6} md = {3}>
            <strong>Identity: </strong>
            {identity}
          </Grid>
          <Grid xs={12} sm={6} md = {3}>
            <strong>Similarity: </strong>
            {similarity}
          </Grid>
          <Grid xs={12} sm={6} md = {3}>
            <strong>Gaps: </strong>
            {gaps}
          </Grid>
        </Grid>
        <Grid container sx={{margin:2}}>
          <Grid xs = {12} sm = {12} ></Grid>
            <Box component="div" id={`psv-${index}`}/>
        </Grid>
      </Box>
    </Card>
    </>
    
  );
}

export default AlignmentSequenceCard;