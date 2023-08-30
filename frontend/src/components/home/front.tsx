import { Box, Typography } from "@mui/material";
interface Props{
    title:string;
    description:string;
}

export default function Front({title, description}:Props) {
  return (
    <>
      <Box>
        <Typography
          textAlign="center"
          color="#2962ff"
          variant="h2"
          fontWeight="bold"
        >
          {title}
        </Typography>
      </Box>
      <Box marginTop={1}>
        <Typography
          variant="subtitle1"
          sx={{ fontStyle: "normal", width: "85%", margin: "auto" }}
          fontSize={24}
          textAlign="center"
        >
          {description}
        </Typography>
      </Box>
    </>
  );
}