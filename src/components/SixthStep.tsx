import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useContext } from "react";
import { AppContext } from "../Context";
import { AddButton } from "./button/AddButton";
import OverallInfo from "./OverallInfo";

type DropdownOption = {
    value: string;
    label: string;
};

export default function SixthStep() {
    const { formValues, handleChange, handleBack, handleNext, variant, margin } = useContext(AppContext);
    const { bookingModule, exclusionCriteria } = formValues;

    return (
        <>
            <OverallInfo />
            <Grid container spacing={2} pt={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Booking Module"
                        name="bookingModule"
                        value={bookingModule.value}
                        onChange={handleChange}
                        error={!!bookingModule.error}
                        helperText={bookingModule.error}
                        required={bookingModule.required}
                    >
                        <option value=""> </option>
                        <option value="Auto">Auto</option>
                        <option value="Manual">Manual</option>
                    </TextField>
                </Grid>
            </Grid>

            {bookingModule.value === "Auto" && (
                <Grid container spacing={2} mt={-5} justifyContent="center" alignItems="center">
                    <Grid item xs={1}>
                        <AddButton title="Add Exclusion Criteria" style={{ marginTop: 45 }} onClick={() => null} />
                    </Grid>

                    <Grid item xs={6} marginRight={5}>
                        <TextField
                            style={{ marginTop: 35 }}
                            variant={variant}
                            margin={margin}
                            fullWidth
                            select
                            SelectProps={{
                                native: true
                            }}
                            label="Exclusion Criteria"
                            name="exclusionCriteria"
                            value={exclusionCriteria.value}
                            onChange={handleChange}
                            error={!!exclusionCriteria.error}
                            helperText={exclusionCriteria.error}
                            required={exclusionCriteria.required}
                        >
                            <option value=""> </option>
                            <option value="Profile 1">Profile 1</option>
                            <option value="Profile 2">Profile 2</option>
                        </TextField>
                    </Grid>
                </Grid>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>

                {bookingModule.value === "Auto" && (
                    <Button onClick={() => null} sx={{ mr: 1 }}>
                        Save Progress
                    </Button>
                )}

                {bookingModule.value === "Auto" && (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                )}

                {bookingModule.value === "Manual" && (
                    <Button
                        disabled={!bookingModule.value || (bookingModule.value === "Auto" && !exclusionCriteria.value)}
                        variant="contained"
                        color="primary"
                        onClick={() => null}
                    >
                        Finish
                    </Button>
                )}
            </Box>
        </>
    );
}
