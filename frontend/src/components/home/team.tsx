import { Box, Typography, Grid } from "@mui/material";

import CardProfile from "./card_profile";

import config from "../../config.json";

export default function Team() {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Team
        </Typography>
      </Box>
      <Box marginTop={5}>
        <Grid container spacing={2}>
          {config.home.team.map((member)=>(
            <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
              <CardProfile
                name={member.name}
                rol={member.rol}
                image={member.image}
                github={member.github}
                linkedin={member.linkedin}
              />
            </Grid>
          ))
          }
        </Grid>
      </Box>
    </>
  );
}
