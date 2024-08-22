import { Button, Grid } from "@mui/material";
import { downloadFile } from "../../services/download_file";
interface Props{
    name: string;
    button_text?: string;
    format?: string;
}
export default function Download({name, button_text = "Download sequences", format}:Props){
    let url = "/files/downloads/"+name
    if (format !== undefined){
        url = url + format
    }
    const onclick = async () =>{
        downloadFile({url: url,
        name : name})
    }
    return(
        (name !== "") ? (
            <Button variant="contained"
            onClick={onclick}
            >{button_text}</Button>
        ) :
        (
            <Button variant="contained" disabled
            onClick={onclick}
            >{button_text}</Button>
        )
    )
}