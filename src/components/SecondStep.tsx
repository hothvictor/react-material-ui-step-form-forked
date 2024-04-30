import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useCallback, useContext } from "react";
import { AppContext } from "../Context";
import { AddButton } from "./button/AddButton";
import OverallInfo from "./OverallInfo";
import { SecondStepModal } from "./SecondStepModal";

export default function SecondStep() {
  const {
    formValues,
    handleChange,
    handleBack,
    handleNext,
    variant,
    margin,
    openModal,
    bookingHosptialMappingOptions,
  } = useContext(AppContext);
  const { city, date, phone, agreenemt, bookingHospital } = formValues;

  const isError = useCallback(
    () =>
      Object.keys({ city, date, phone, agreenemt }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, city, date, phone, agreenemt]
  );

  return (
    <>
      <SecondStepModal title="Add Booking Hospital"></SecondStepModal>
      <OverallInfo />
      <Grid
        container
        spacing={2}
        pt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <AddButton title="Add Booking Hospital" onClick={openModal} />
        </Grid>

        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            label="Booking Hospital"
            name="bookingHospital"
            value={bookingHospital.value}
            onChange={handleChange}
            error={!!bookingHospital.error}
            helperText={bookingHospital.error}
            required={bookingHospital.required}
          >
            <option value=""> </option>
            {bookingHosptialMappingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!bookingHospital.value}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
