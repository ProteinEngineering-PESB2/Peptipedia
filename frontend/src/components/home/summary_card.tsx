import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ValueProps {
    type: string;
    value: string;
}

export default function SummaryCard({type, value}: ValueProps) {
    return (
      <>
      <Card variant="outlined" sx={{ boxShadow: 3, p: 1, m: 1}}>
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
                        alignItems: "center"
                    }}
                    >
                    <Typography fontWeight="bold" variant="h5">
                        {type}
                    </Typography>
                    <Typography fontWeight="400" variant="h6">
                        {value}
                    </Typography>
                </Box>
            </Box>
            </CardContent>
        </Card>
      </>
    );
}
