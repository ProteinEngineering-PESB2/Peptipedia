import { Button, Grid } from "@mui/material";
import { downloadFile } from "../../services/download_file";
interface Props{
    name: string;
    button_text?: string;
}
export default function Download({name, button_text = "Download sequences"}:Props){
    return(
        <Button variant="contained"
        onClick={()=>{
            downloadFile({url: "/files/downloads/"+name,
            name : name})
        }}
        >{button_text}</Button>
    )
}