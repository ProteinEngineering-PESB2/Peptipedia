import { Drawer, ListItemButton } from "@mui/material";
import { drawerWidth } from "../common/drawerWith";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
interface Props {
  open: boolean;
}

function Aside({ open }: Props) {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List>
        <ListItemButton onClick={() => navigate(config.home.route)}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#000" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </List>
      <List component="div" disablePadding>
        {
          config.sidebar.navigate.map((a)=>{
            return (
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(config[a].route)}>
              <ListItemIcon>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#000" }} />
              </ListItemIcon>
              <ListItemText primary={config[a].title} />
            </ListItemButton>)
            }
          )
        }
      </List>
    </Drawer>
  );
}

export default Aside;
