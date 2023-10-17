import axios from "axios"
import { useEffect, useState } from "react"
import ChordChart from "../plots/chord_chart"
export default function Chord(){
    const [ data, setData ] = useState([])
    const get_data = async () => {
        try{
            const response = await axios.get("/api/get_chord")
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
            <ChordChart data = {data}/>
        </>
    )
}