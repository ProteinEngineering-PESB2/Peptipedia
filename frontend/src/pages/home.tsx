import { useHandleSection } from "../hooks/useHandleSection";
import { Box, Typography, Container } from "@mui/material";
import useLoadingComponent from "../hooks/useLoadingComponent";
import DashboardLayout from "../components/common/dashboard_layout";
import Team from "../components/home/team";
import Links from "../components/home/links"
import Cite from "../components/home/cite"
import Data from "../components/home/data"
import Front from "../components/home/front"
import config from "../config.json"
import Diagram from "../components/home/diagram";

export default function Home() {
  const obj = config.home
  useHandleSection({ section: "home" });
  useLoadingComponent();

  return (
    <DashboardLayout>
      <>
        <Box sx={{ padding: 2 }}>
          <Front title = {obj.title} description = {obj.description}/>
        </Box>
        <Box sx={{ padding: 3}}>
          <Diagram/>
        </Box>

        <Box padding={3}>
            <Container
            sx={{ textAlign: "justify" }}
            maxWidth="lg"
            >
            <Typography variant="subtitle1" fontStyle="italic" marginTop={1}>
                {config.home.description_2}
            </Typography>
            </Container>
          </Box>
        <Box sx={{ padding: 3 }}>
          <Data/>
        </Box>
        <Box sx={{ padding: 3}}>
          <Links/>
        </Box>

        <Box sx={{ padding: 3 }}>
          <Cite/>
        </Box>

        <Box sx={{ padding: 3}}>
          <Team/>
        </Box>
      </>
    </DashboardLayout>
  );
}
