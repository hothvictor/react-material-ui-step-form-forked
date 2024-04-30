import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { AddButton } from "./button/AddButton";
import OverallInfo from "./OverallInfo";
import { ThirdStepModal } from "./ThirdStepModal";

type DropdownOption = {
  value: string;
  label: string;
};

export default function ThirdStep() {
  const {
    formValues,
    handleChange,
    handleBack,
    handleNext,
    variant,
    margin,
    openModal,
  } = useContext(AppContext);

  const { crHospital } = formValues;

  const [optionList, setOptionList] = useState<Array<DropdownOption>>([
    { value: "QMH", label: "QMH" },
    { value: "VH", label: "VH" },
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
      <ThirdStepModal
        title="Add C/R Hospital"
        updateDropdownOptions={updateDropdownOptions}
      ></ThirdStepModal>
      <OverallInfo />
      <Grid
        container
        spacing={2}
        pt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <AddButton title="Add C/R Hospital" onClick={openModal} />
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
            label="C/R Hospital"
            name="crHospital"
            value={crHospital.value}
            onChange={handleChange}
            error={!!crHospital.error}
            helperText={crHospital.error}
            required={crHospital.required}
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
          disabled={!crHospital.value}
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
