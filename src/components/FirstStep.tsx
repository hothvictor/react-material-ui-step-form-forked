import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useCallback, useContext } from "react";
import { AppContext } from "../Context";
import OverallInfo from "./OverallInfo";

export default function FirstStep() {
  const {
    formValues,
    handleChange,
    handleNext,
    variant,
    margin,
    streamOptions,
  } = useContext(AppContext);
  const { firstName, lastName, email, gender, stream } = formValues;
  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ firstName, lastName, email, gender }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, firstName, lastName, email, gender]
  );

  return (
    <>
      <OverallInfo />
      <Grid
        container
        spacing={2}
        pt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            label="Stream"
            name="stream"
            value={stream.value}
            onChange={handleChange}
            error={!!stream.error}
            helperText={stream.error}
            required={stream.required}
          >
            <option value=""> </option>
            {streamOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          disabled={!stream.value}
          color="primary"
          onClick={isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
