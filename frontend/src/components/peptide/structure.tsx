import { useEffect, useState } from "react"
import {Box, Button, Grid} from "@mui/material"
import $ from "jquery";
import config from "../../config.json";

window.jQuery = window.$ = $;
interface Props{
  pdb_id?: string;
}
export default function Structure({pdb_id}:Props){
  useEffect(() => {
    if (pdb_id) {
      import("3dmol/build/3Dmol.js").then(($3Dmol) => {
        let element = $(`#structure`);
        let config = { backgroundColor: "#f3f4f6"};
        let viewer = $3Dmol.createViewer(element, config);
        $.ajax(`https://alphafold.ebi.ac.uk/files/AF-${pdb_id}-F1-model_v4.pdb`, {
          success: function (data:any) {
            let v = viewer;
            v.addModel(data, "pdb");
            v.setStyle( {}, { cartoon: { color: "spectrum" }});
            v.zoomTo();
            v.render();
          },
          error: function (hdr:any, status:any, err:any) {
            console.log(err, hdr, status)
          },
        });
      });
    }
  }, [pdb_id]);
  return (
    <>
    <Box
    display='flex'
    justifyContent='center'>
      {(pdb_id) &&
      (<Box id="structure" component="div" sx={{ height: 500, width: 1000, position: 'relative'}}/>)
      }
    </Box>
    {(pdb_id)&&(
      <Grid container justifyContent="flex-end">
        <Button variant="contained" onClick={()=>{
          window.open(config.peptide.alphafold_page + pdb_id)
        }}>Go to Alphafold 2</Button>
      </Grid>
    )}
    </>
  )
}