import {
    Grid,
    Autocomplete,
    Checkbox,
    TextField,
    Button,
    Paper,
    Box,
  } from "@mui/material";
import {
ChangeEvent,
Dispatch,
SetStateAction,
SyntheticEvent,
useState,
} from "react";
import SliderForm from "./slider_form";

export default function Form(){
    const params = {min: 0, max: 10}
    return (
        <>
            <Grid item xs={12} sm={12} md={9} lg={12} xl={4}>
                <Box marginTop={3} boxShadow={4}>
                    <Paper
                        sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        }}
                    >
                        <form>
                            <SliderForm label = {"Length"} params = {params}></SliderForm>
                            <SliderForm label = {"Molecular Weight"} params = {params}></SliderForm>
                        </form>
                    </Paper>
                </Box>
            </Grid>
        </>
    )
}