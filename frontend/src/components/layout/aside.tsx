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
import ConstructionIcon from '@mui/icons-material/Construction';
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import DownloadIcon from '@mui/icons-material/Download';
import SourceIcon from '@mui/icons-material/Source';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
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
          <KeyboardDoubleArrowRightIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["activities"].title} />
      </ListItemButton>


      <ListItemButton onClick={() => navigate(config["sources"].route)}
      selected={actual_location == "sources" ? true : false}>
        <ListItemIcon>
          <SourceIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["sources"].title} />
      </ListItemButton>

      <ListItemButton onClick={() => navigate(config["search"].route)}
      selected={actual_location == "search" ? true : false}>
        <ListItemIcon>
          <SearchIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["search"].title} />
      </ListItemButton>


      <ListItemButton onClick={() => navigate(config["alignment"].route)}
      selected={actual_location == "alignment" ? true : false}>
        <ListItemIcon>
          <FormatAlignCenterIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["alignment"].title} />
      </ListItemButton>

      <ListItemButton onClick={() => navigate(config["download"].route)}
      selected={actual_location == "download" ? true : false}>
        <ListItemIcon>
          <DownloadIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={config["download"].title} />
      </ListItemButton>

      <ListItemButton onClick={() => window.location.replace(config.tools.route)}>
        <ListItemIcon>
          <ConstructionIcon sx={{ color:"#000" }} />
        </ListItemIcon>
        <ListItemText primary={"Tools"} />
      </ListItemButton>
      </List>
    </Drawer>
  );
};