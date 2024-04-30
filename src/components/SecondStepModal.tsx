import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import { OpenModal } from "./Modal/OpenModal";

interface OpenModalProps {
  title: String;
}

const dividerStyle = {
  width: "100%",
  margin: "12px 0",
};

const buttonStyle = {
  marginTop: 16,
};

export const SecondStepModal: React.FC<OpenModalProps> = ({ title }) => {
  const [optionValue, setOptionValue] = useState<string>("");

  const {
    openModal,
    variant,
    margin,
    bookingHosptialOptions,
    updateBookingHospitalMappingOptions,
    updateBookingHospitalOptions,
  } = useContext(AppContext);

  const handleChange = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const hosptialCode = value.target.value;
    setOptionValue(hosptialCode);
  };

  const handSubmit = () => {
    updateBookingHospitalMappingOptions(optionValue);
    updateBookingHospitalOptions(optionValue);
    openModal();
  };

  return (
    <OpenModal title={title}>
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
          value={optionValue}
          onChange={handleChange}
        >
          <option value=""> </option>
          {bookingHosptialOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Grid>
      {/* <Divider sx={dividerStyle} /> */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonStyle}
          onClick={handSubmit}
        >
          Add
        </Button>
      </Box>
    </OpenModal>
  );
};
