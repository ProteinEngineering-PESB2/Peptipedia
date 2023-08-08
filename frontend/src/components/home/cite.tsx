
import CopyToClipboard from "react-copy-to-clipboard";
import { Box, Typography, Container, Link, FilledInput} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

import config from "../../config.json";

export default function Cite() {
  return (
    <>
        <Container
        sx={{ textAlign: "center", paddingBottom: 7 }}
        maxWidth="lg"
        >
        <Typography fontSize={30} fontWeight="600" marginTop={6}>
            {config.home.cites.title}
        </Typography>

        {config.home.cites.data.map((cite) => (
            <Box key={cite.cite}>
            <Box marginTop={2}>
                <FilledInput
                id="filled-multiline-static-cite"
                multiline
                rows={3}
                defaultValue={cite.cite}
                fullWidth
                endAdornment={
                    <CopyToClipboard text={cite.cite}>
                    <Link href={cite.link} target="_blank">
                        <LaunchIcon
                        sx={{
                            display: "flex",
                            alignItems: "end",
                            marginBottom: 6,
                        }}
                        />
                    </Link>
                    </CopyToClipboard>
                }
                />
            </Box>
            </Box>
        ))}
        </Container>
    </>
  );
}
