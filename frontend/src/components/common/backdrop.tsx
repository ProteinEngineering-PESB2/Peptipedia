import { Backdrop, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  open: boolean;
}

export default function BackdropComponent({ open }: Props) {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
  );
}