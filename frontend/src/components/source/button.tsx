import { Button , Grid} from "@mui/material";

interface Props{
    url: string;
}
export default function RedirectButton({url}: Props){
    return(
        <Grid container justifyContent="flex-end">
            <Button variant="contained"
            onClick={()=>{
                window.open(url)
            }}
            >Visit source</Button>

        </Grid>
    )
}