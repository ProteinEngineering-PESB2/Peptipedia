import { IconButton, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./app_bar";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
}

function Navbar({ open, handleDrawerOpen }: Props) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700} noWrap component="div">
          Peptipedia
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
