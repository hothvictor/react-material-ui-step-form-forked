import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context";
import { AddButton } from "./button/AddButton";
import { FourthStepModal } from "./FourthStepModal";
import OverallInfo from "./OverallInfo";

type DropdownOption = {
  value: string;
  label: string;
};

export default function FourthStep() {
  const {
    formValues,
    handleChange,
    handleBack,
    handleNext,
    variant,
    margin,
    openModal,
  } = useContext(AppContext);
  const { stream, bedType } = formValues;

  useEffect(() => {
    if (stream.value === "MED")
      setOptionList([
        { value: "(MED Stream) COVID Bed", label: "(MED Stream) COVID Bed" },
        { value: "(MED Stream) Renal Bed", label: "(MED Stream) Renal Bed" },
      ]);
    else
      setOptionList([
        { value: "(SUR Stream) COVID Bed", label: "(SUR Stream) COVID Bed" },
        { value: "(SUR Stream) Renal Bed", label: "(SUR Stream) Renal Bed" },
      ]);
  }, [stream.value]);

  const [optionList, setOptionList] = useState<Array<DropdownOption>>([]);

  const updateDropdownOptions = (option: string) => {
    const newObject = {
      value: option,
      label: option,
    };
    const sortedOptions = _.sortBy([...optionList, newObject], "label");
    setOptionList(sortedOptions);
  };

  return (
    <>
      <FourthStepModal
        title="Add Bed Type"
        updateDropdownOptions={updateDropdownOptions}
      ></FourthStepModal>
      <OverallInfo />
      <Grid
        container
        spacing={2}
        pt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <AddButton title="Add Bed Type" onClick={openModal} />
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
            label="Bed Types"
            name="bedType"
            value={bedType.value}
            onChange={handleChange}
            error={!!bedType.error}
            helperText={bedType.error}
            required={bedType.required}
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
          disabled={!bedType.value}
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
