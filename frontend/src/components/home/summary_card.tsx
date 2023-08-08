import StorageIcon from "@mui/icons-material/Storage";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
export default function SummaryCard({info}) {
    return (
      <>
      <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
        <CardContent>
            <Box
                height="100%"
                sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                    }}
                    >
                    <Typography fontWeight="bold" variant="h5">
                        {info.type}
                    </Typography>
                    <Typography fontWeight="400" variant="h6">
                        {info.value}
                    </Typography>
                </Box>
                <StorageIcon fontSize="large" />
            </Box>
            </CardContent>
        </Card>
      </>
    );
}
