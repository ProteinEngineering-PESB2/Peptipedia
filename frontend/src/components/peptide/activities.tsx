import {Box, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import config from "../../config.json"

interface ActProp{
  id: number;
  name: string;
}
interface Props{
  activities: Array<ActProp>;
}
const activity_clicked = (index: number) => {
  window.open(config.peptide.redirect + index)
}
export default function Activities({activities}: Props) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Typography variant="h5">
        Activities
      </Typography>
      <List component="nav" aria-label="main folders">
        {
          activities.map((x)=>(
            <ListItemButton
              onClick={() => activity_clicked(x.id)}
            >
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          ))
        }
      </List>
    </Box>
  );
}
