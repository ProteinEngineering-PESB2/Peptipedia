import { Button, Grid } from "@mui/material";
import { downloadFile } from "../../services/download_file";
interface Props{
    name: string;
}
export default function Download({name}:Props){
    return(
        <Grid container justifyContent="flex-end">
            <Button variant="contained"
            onClick={()=>{
                downloadFile({url: "/files/downloads/"+name+".fasta",
                name : name+".fasta"})
            }}
            >Download sequences</Button>
        </Grid>
    )
}