
import CopyToClipboard from "react-copy-to-clipboard";
import { Box, Typography, Container, Link, IconButton, FilledInput, InputAdornment, Tooltip} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import config from "../../config.json";
import {useState} from "react";

export default function Cite() {
    const [copied, setCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
  
    const handleCopied = () => {
      setCopied(true);
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    };
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
                rows={7}
                defaultValue={cite.cite}
                fullWidth
                endAdornment={
                    <CopyToClipboard text={cite.cite}>
                    <InputAdornment
                      position="end"
                      sx={{ display: "flex", alignItems: "end", marginBottom: 8 }}
                    >
                      <Tooltip
                        title={showTooltip ? "Copied" : ""}
                        onClick={handleCopied}
                        open={showTooltip}
                      >
                        <IconButton edge="end">
                          <ContentCopyIcon
                            color={copied ? "primary" : "inherit"}
                          />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
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
