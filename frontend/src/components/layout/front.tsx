import { Container, Typography } from "@mui/material";
export default function Front({obj}) {
  return (
    <>
    {(obj !== undefined)&&(
      <Container
      sx={{ textAlign: "center" }}
      maxWidth="lg"
      >
        <Typography variant="h3" fontWeight="bold">
            {obj.title}
        </Typography>
        <Container
          sx={{ textAlign: "justify" }}
          maxWidth="lg"
          >
          <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
              {obj.description}
          </Typography>
        </Container>
      </Container>
    )}
    </>
  );
}
