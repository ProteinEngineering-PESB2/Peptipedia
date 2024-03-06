import {  Box, Container} from "@mui/material";
import config from "../../config.json";

export default function Entities() {
    return (
        <>
        <footer
        >
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
            }}
            >
            {config.home.entities.map((entity) => (
                <img
                src={entity.url}
                alt={entity.alt}
                width={entity.width}
                height={entity.height}
                />
            ))}
            </Box>
        </footer>
        </>
    )
    }