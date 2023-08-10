import { Grid } from "@mui/material";
import SummaryCard from "./summary_card"
interface Props {
    "type": String;
    "value": String;
}
export default function CardsList({general_table}: Array<any>) {
    return (
        <>
        <Grid container spacing={2} sx={{ marginTop: 1}}>
            {
                (general_table !== undefined) &&
                (
                    general_table.map((info: String)=>(
                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                            <SummaryCard info={info}></SummaryCard>
                        </Grid>
                    ))
                )
            }
        </Grid>
        </>
    )
}