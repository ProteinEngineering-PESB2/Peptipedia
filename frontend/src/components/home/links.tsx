import {  Typography, Button, Grid , Container, Card, CardContent, Link} from "@mui/material";
import config from "../../config.json";

export default function Links() {
  return (
    <>
    <Container
    sx={{ textAlign: "center", paddingBottom: 7 }}
    maxWidth="lg"
    >
    <Typography fontSize={30} fontWeight="600" marginTop={6}>
    {config.home.links.title}
    </Typography>

    <Grid container spacing={2} marginTop={2} padding={4}>
    {config.home.links.data.map((link) => (
        <Grid item xs={12} sm={6} md={4} xl={4} key={link.title}>
        <Card
            sx={{ width: "100%", boxShadow: 5 }}
            variant="elevation"
        >
            <CardContent
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "15rem",
            }}
            >
            <img
                src={link.icon}
                alt={link.title}
                width={35}
                height={35}
            />

            <Typography variant="h6" fontWeight="600">
                {link.title}
            </Typography>

            <Typography variant="subtitle2" fontStyle="italic">
                {link.description}
            </Typography>

            <Button variant="outlined" color="success">
                <Link
                href={link.redirect}
                target="_blank"
                sx={{ textDecoration: "none", color: "#43a047" }}
                >
                {link.button}
                </Link>
            </Button>
            </CardContent>
        </Card>
        </Grid>
    ))}
    </Grid>
    </Container> 
    </>
  );
}
