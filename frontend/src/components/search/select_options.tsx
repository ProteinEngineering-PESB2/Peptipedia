import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';

interface Props{
  options: {
    name: Array<string>;
    id_activity: Array<number>;
  }
  setQuery: React.Dispatch<React.SetStateAction<{}>>;
}

export default function SelectOptions({options, setQuery, query}: Props) {
  const [activities, setActivities] = React.useState<string[]>([]);
  const names = options.name

  const handleChange = (event: SelectChangeEvent<typeof activities>) => {
    const { target: { value }} = event;
    setActivities(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  useEffect(() => {
    setQuery({ ...query, activities: activities })
  }, [activities]);


  return (
    <div>
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Activity</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activities}
          onChange={handleChange}
          input={<OutlinedInput label="Activity" />}
          renderValue={(selected) => selected.join(', ')}
          autoWidth={true}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={activities.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}