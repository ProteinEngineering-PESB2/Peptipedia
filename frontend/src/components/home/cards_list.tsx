import { Grid , Skeleton} from "@mui/material";
import SummaryCard from "./summary_card"
export default function CardsList({general_table}) {
    return (
        <>
        <Grid container spacing={2} sx={{ marginTop: 1}}>
            {
                (general_table !== undefined) &&
                (
                    general_table.map((info)=>(
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