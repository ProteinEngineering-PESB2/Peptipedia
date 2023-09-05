import {Box, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';


interface Props{
  activities: Array<string>;
  id_activities: Array<number>;
  redirect: string;
  title: string;
}

export default function ListItems({activities, id_activities, redirect, title}: Props) {
  const row_clicked = (index: number) => {
    console.log(redirect + index)
    window.open(redirect + index)
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 360,}}>
      <Typography variant="h5">
        {title}
      </Typography>
      <List component="nav" aria-label="main folders">
        {
          activities.map((x, index)=>(
            <ListItemButton
              onClick={() => row_clicked(id_activities[index])}
            >
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary={x} />
            </ListItemButton>
          ))
        }
      </List>
    </Box>
  );
}
