import axios from "axios"
import { useEffect, useState } from "react"
import ChordChart from "../plots/chord_chart"
import config from "../../config.json";
export default function Chord(){
    const [ data, setData ] = useState([])
    const get_data = async () => {
        try{
            const response = await axios.get(config.activities.chord_api)
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
            <ChordChart data = {data} />
        </>
    )
}