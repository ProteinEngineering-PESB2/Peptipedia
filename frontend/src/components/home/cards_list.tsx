import { Grid } from "@mui/material";
import SummaryCard from "./summary_card"
import Tooltip from '@mui/material/Tooltip';
import config from "../../config.json";
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
                <>
                <Tooltip title={config.home.captions.databases}>
                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                        <SummaryCard type={general_table[0].type} value={general_table[0].value}/>
                    </Grid>
                </Tooltip>
                <Tooltip title={config.home.captions.sequences}>
                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                        <SummaryCard type={general_table[1].type} value={general_table[1].value}/>
                    </Grid>
                </Tooltip>
                <Tooltip title={config.home.captions.activities}>
                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                        <SummaryCard type={general_table[2].type} value={general_table[2].value}/>
                    </Grid>
                </Tooltip>
                <Tooltip title={config.home.captions.last_update}>
                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                        <SummaryCard type={general_table[3].type} value={general_table[3].value}/>
                    </Grid>
                </Tooltip>
                </>
            }
        </Grid>
        </>
    )
}