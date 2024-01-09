import { Grid } from "@mui/material";
import SummaryCard from "./summary_card"
interface ValueProps {
    type: string;
    value: string;
}
interface Props {
    general_table: Array<ValueProps>;
}
export default function CardsList({general_table}: Props) {
    return (
        <>
        <Grid container spacing={2} sx={{ marginTop: 1}}>
            {
                (general_table !== undefined) &&
                (
                    general_table.map((info) =>(
                        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                            <SummaryCard type={info.type} value={info.value}/>
                        </Grid>
                    ))
                )
            }
        </Grid>
        </>
    )
}