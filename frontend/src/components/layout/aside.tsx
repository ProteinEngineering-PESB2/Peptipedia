import { Drawer, ListItemButton } from "@mui/material";
import { drawerWidth } from "./drawerWith";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import {useEffect, useState} from "react";
interface Props {
  sidebar: {
    home : Array<string>;
    navigate: Array<string>;
  }
  home: {

  }

}
export default function Aside() {
  const [actual_location, setActualLocation] = useState("")
  const navigate = useNavigate();
  const url = window.location.href;
  useEffect(()=>{
    let splitted_url = url.split("/")
    setActualLocation(splitted_url[splitted_url.length - 1])
  }, [url])
  
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
      open={true}
    >
      <List>
        <ListItemButton onClick={() => navigate(config.home.route)}>
          <ListItemIcon >
            <HomeIcon sx={{ color: "#000" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </List>
      <List component="div" disablePadding>


      <ListItemButton onClick={() => navigate(config["activities"].route)}
      selected={actual_location == "activities" ? true : false}>
        <ListItemIcon>
          <ArrowRightIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["activities"].title} />
      </ListItemButton>


      <ListItemButton onClick={() => navigate(config["sources"].route)}
      selected={actual_location == "sources" ? true : false}>
        <ListItemIcon>
          <ArrowRightIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["sources"].title} />
      </ListItemButton>

      <ListItemButton onClick={() => navigate(config["search"].route)}
      selected={actual_location == "search" ? true : false}>
        <ListItemIcon>
          <ArrowRightIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["search"].title} />
      </ListItemButton>


      <ListItemButton onClick={() => navigate(config["alignment"].route)}
      selected={actual_location == "alignment" ? true : false}>
        <ListItemIcon>
          <ArrowRightIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["alignment"].title} />
      </ListItemButton>

      </List>
    </Drawer>
  );
};