import { Typography } from "@mui/material";

interface Props {
  title: string;
  description?: string;
  level?: number;
}

export default function SectionTitle({ title, description, level }: Props) {
  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold" }}
        sx={{
          textAlign: {
            xs: "center",
            sm: "start",
            md: "start",
            lg: "start",
            xl: "start",
          },
        }}
      >
        {title}{" "}
        {level && <Typography variant="subtitle1">(Level {level})</Typography>}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: {
            xs: "center",
            sm: "start",
            md: "start",
            lg: "start",
            xl: "start",
          },
          marginTop: 1,
          fontWeight: "400",
        }}
      >
        {description}
      </Typography>
    </>
  );
}
