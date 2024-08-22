import axios from "axios"
import { useEffect, useState } from "react"
import ChordChart from "../plots/chord_chart"
import config from "../../config.json";
import { Box, Container, Typography } from "@mui/material";
export default function Chord(){
    const [ data, setData ] = useState([])
    const get_data = async () => {
        try{
            const response = await axios.post(config.activities.chord_api, {predicted:false})
            setData(response.data.results.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        get_data()
    }, [])

    return(
        <>
            <Box padding={1}>
                <Container
                sx={{ textAlign: "justify" }}
                maxWidth="lg"
                >
                <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
                    {config.activities.description_4}
                </Typography>
                </Container>
            </Box>
            <Box padding={1}>
                <ChordChart data = {data} predicted = {false}/>
            </Box>
        </>
    )
}