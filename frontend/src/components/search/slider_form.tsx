import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import {useState, useEffect} from "react"

interface Params{
  min: number;
  max: number;
}

interface Props{
  label: string;
  param_name: string;
  params: Params;
  setQuery: React.Dispatch<React.SetStateAction<any>>;
  query: {}
}

export default function SliderForm({label, params, param_name, setQuery, query}: Props){
  const [value, setValue] = useState([params.min, params.max])
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const title = label.charAt(0).toUpperCase() + label.slice(1).replace("_", " ");
  useEffect(() => {
    setQuery({ ...query, [param_name]: value})
  }, [value]);

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <FormLabel>{title} [{value[0]} - {value[1]}]</FormLabel>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={params.min}
        max={params.max}
        step={0.2}
      />
    </FormControl>
  )
}