import {
    Grid,
    FilledInput,
    InputAdornment,
    Tooltip,
    IconButton,
    Typography
  } from "@mui/material";
  import { CopyToClipboard } from "react-copy-to-clipboard";
  import ContentCopyIcon from "@mui/icons-material/ContentCopy";
  import { useState } from "react";
  
  interface Props {
    sequence: string;
  }
  
  export default function PeptideSequence({ sequence }: Props) {
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
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FilledInput
                id="filled-multiline-static"
                multiline
                rows={5}
                defaultValue={sequence}
                fullWidth
                endAdornment={
                  <CopyToClipboard text={sequence}>
                    <InputAdornment
                      position="end"
                      sx={{ display: "flex", alignItems: "end", marginBottom: 8 }}
                    >
                      <Tooltip
                        title={showTooltip ? "Copied sequence" : ""}
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
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }