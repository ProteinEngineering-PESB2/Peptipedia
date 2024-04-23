import Switch from '@mui/material/Switch';
import { FormControl, FormControlLabel } from '@mui/material';
import {useState, useEffect} from 'react';

interface Props{
  setQuery: React.Dispatch<React.SetStateAction<any>>;
  query: {}
}

export default function CheckPredicted({query, setQuery}:Props){
  const [predicted, setPredicted] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPredicted(event.target.checked);
  };

  useEffect(() => {
    setQuery({ ...query, predicted: predicted })
  }, [predicted]);

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <FormControlLabel control={
        <Switch 
          checked={predicted}
          onChange={handleChange}/>
      } label="Include predicted activities" />
    </FormControl>
  )
}