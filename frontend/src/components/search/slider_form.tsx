import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

interface Params{
  min: number;
  max: number;
}

interface Props{
  label: string;
  params: Params;
}

export default function SliderForm({label, params}: Props){
  return (
    <>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <FormLabel>{label}</FormLabel>
        <Slider
        aria-labelledby="label-length"
        valueLabelDisplay="auto"
        min={params.min}
        max={params.max}
        />
      </FormControl>
    </>
  )
}