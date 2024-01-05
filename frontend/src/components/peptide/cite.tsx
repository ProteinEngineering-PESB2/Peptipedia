import { Typography, Container} from "@mui/material";
import config from "../../config.json";
import CiteItem from "./cite_item";
interface Props{
    cite_data: Array<string>
}

export default function Cite({cite_data}:Props) {
  return (
    <>
        <Container
        sx={{ textAlign: "center", paddingBottom: 7 }}
        maxWidth="lg"
        >
        <Typography fontSize={30} fontWeight="600" marginTop={6}>
            References
        </Typography>

        {cite_data.map((cite) => (
          <CiteItem cite_text={cite} ></CiteItem>
        ))}
        </Container>
    </>
  );
}
