import Switch from '@mui/material/Switch';
import { FormControl, FormControlLabel } from '@mui/material';
import {useState, useEffect} from 'react';

interface Props{
  setQuery: React.Dispatch<React.SetStateAction<any>>;
  query: {}
}

export default function CheckCanon({query, setQuery}:Props){
  const [canon, setCanon] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanon(event.target.checked);
  };

  useEffect(() => {
    setQuery({ ...query, is_canon: canon })
  }, [canon]);
  useEffect(()=>{
    setQuery({ ...query, is_canon: canon })
  }, [])

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <FormControlLabel control={
        <Switch 
          checked={canon}
          onChange={handleChange}/>
      } label="Only canonical peptides" />
    </FormControl>
  )
}