import {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Box, IconButton,
    FilledInput, InputAdornment,
    Tooltip} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props{
    cite_text: string;
}

export default function CiteItem({cite_text}:Props) {
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
    <Box key={cite_text}>
      <Box marginTop={2}>
        <FilledInput
        id="filled-multiline-static-cite"
        multiline
        rows={4}
        defaultValue={cite_text}
        fullWidth
        endAdornment={
        <CopyToClipboard text={cite_text}>
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
  )
}