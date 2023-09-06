
import { Typography, Container} from "@mui/material";
import config from "../../config.json";
import CiteItem from "./cite_item";

export default function Cite() {
  return (
    <>
        <Container
        sx={{ textAlign: "center", paddingBottom: 7 }}
        maxWidth="lg"
        >
        <Typography fontSize={30} fontWeight="600" marginTop={6}>
            How to cite
        </Typography>

        {config.home.cites.data.map((cite) => (
          <CiteItem cite_text={cite.cite} ></CiteItem>
        ))}
        </Container>
    </>
  );
}
