import { Container, Typography } from "@mui/material";
interface Props{
  obj: {
    title?: string;
    description?: string;
  }
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
          <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
              {obj.description}
          </Typography>
      </Container>
    </>
  );
}
