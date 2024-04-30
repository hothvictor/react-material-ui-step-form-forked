import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import _ from 'lodash';
import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import { AddButton } from "./button/AddButton";
import { FifthStepModal } from "./FifthStepModal";
import OverallInfo from "./OverallInfo";

type DropdownOption = {
  value: string;
  label: string;
};

export default function FifthStep() {
  const {
    formValues,
    handleChange,
    handleBack,
    handleNext,
    variant,
    margin,
    openModal,
  } = useContext(AppContext);
  const { ward } = formValues;

  const [optionList, setOptionList] = useState<Array<DropdownOption>>([
    { value: "5A", label: "5A" },
    { value: "5B", label: "5B" },
  ]);

  const updateDropdownOptions = (hospitalCode: string) => {
    const newObject = {
      value: hospitalCode,
      label: hospitalCode,
    };
    const sortedOptions = _.sortBy([...optionList, newObject], "label");
    setOptionList(sortedOptions);
  };

  return (
    <>
      <FifthStepModal
        title={"Add Ward"}
        updateDropdownOptions={updateDropdownOptions}
      />
      <OverallInfo />
      <Grid
        container
        spacing={2}
        pt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <AddButton title="Add Ward" onClick={openModal} />
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
            label="Ward"
            name="ward"
            value={ward.value}
            onChange={handleChange}
            error={!!ward.error}
            helperText={ward.error}
            required={ward.required}
          >
            <option value=""> </option>
            {optionList.map((option) => (
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
          disabled={!ward.value}
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
