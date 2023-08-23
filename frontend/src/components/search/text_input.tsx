import { FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
interface Props{
  setQuery: React.Dispatch<React.SetStateAction<{}>>;
}
export default function TextInput({setQuery, query}:Props){
    const [value, setValue] = useState("")
    useEffect(()=>{
        setQuery({...query, sequence: value})
    }, [value])
    return (
        <FormControl sx = {{ m: 1 }} fullWidth>
            <TextField
                id="filled-multiline-static"
                label="Sequence"
                multiline
                rows={4}
                fullWidth
                variant="filled"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        </FormControl>
    )
}
