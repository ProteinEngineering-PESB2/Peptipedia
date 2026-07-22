
import { Typography, Container, Link } from "@mui/material";
import config from "../../config.json";

export default function License() {
  const license = config.home.license;
  return (
    <>
      <Container
        sx={{ textAlign: "center", paddingBottom: 7 }}
        maxWidth="lg"
      >
        <Typography fontSize={30} fontWeight="600" marginTop={6}>
          {license.title}
        </Typography>

        <Typography variant="subtitle1" marginTop={2}>
          The user-friendly web platform is publicly accessible through{" "}
          <Link href="https://app.peptipedia.cl/" target="_blank" rel="noopener">
            https://app.peptipedia.cl/
          </Link>{" "}
          for non-commercial uses, licensed under a{" "}
          <Link href={license.platform_url} target="_blank" rel="noopener">
            Creative Commons CC BY-NC-ND 4.0
          </Link>{" "}
          license.
        </Typography>

        <Typography variant="subtitle1" marginTop={1}>
          The Peptipedia v2.0 database is licensed under an{" "}
          <Link href={license.database_url} target="_blank" rel="noopener">
            ODbL
          </Link>{" "}
          license.
        </Typography>
      </Container>
    </>
  );
}
