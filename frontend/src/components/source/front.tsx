import { Container, Typography } from "@mui/material";
interface Props{
  title: string;
}
export default function Front({obj}: Props) {
  return (
    <>
      <Container
      sx={{ textAlign: "center" }}
      maxWidth="lg"
      >
        <Typography variant="h3" fontWeight="bold">
            {obj.title}
        </Typography>
      </Container>
    </>
  );
}
