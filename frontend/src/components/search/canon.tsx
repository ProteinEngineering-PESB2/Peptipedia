import Switch from '@mui/material/Switch';
import { FormControl, FormControlLabel } from '@mui/material';
import {useState, useEffect} from 'react';

interface Props{
    setQuery: React.Dispatch<React.SetStateAction<{}>>;
    query: {}
}

export default function Check({query, setQuery}:Props){
    const [canon, setCanon] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCanon(event.target.checked);
    };

    useEffect(() => {
        setQuery({ ...query, is_canon: canon })
    }, [canon]);

    return (
        <FormControl sx={{ m: 1 }} fullWidth>
            <FormControlLabel control={
                <Switch 
                    checked={canon}
                    onChange={handleChange}/>
            } label="Canonical peptides" />
        </FormControl>
    )
}