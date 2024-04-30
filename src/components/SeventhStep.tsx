import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { timeSlots, weekdays } from "../constant";
import { AppContext } from "../Context";
import OverallInfo from "./OverallInfo";

interface WeekdayCutOff {
  weekday: string;
  fromTime: string;
  toTime: string;
}

const initialCutOffs: WeekdayCutOff[] = weekdays.map((weekday) => ({
  weekday,
  fromTime: "",
  toTime: "",
}));

export default function SeventhStep() {
  const { formValues, handleBack, handleNext } = useContext(AppContext);
  const { bookingModule, exclusionCriteria } = formValues;

  const [cutOffTimes, setCutOffTimes] =
    useState<WeekdayCutOff[]>(initialCutOffs);

  const handleTimeChange =
    (index: number, field: keyof WeekdayCutOff) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCutOffTimes = [...cutOffTimes];
      updatedCutOffTimes[index] = {
        ...updatedCutOffTimes[index],
        [field]: event.target.value,
      };
      setCutOffTimes(updatedCutOffTimes);
    };

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
        <Grid item xs={6}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ float: "left" }}></th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {cutOffTimes.map((cutOff, index) => (
                <tr key={cutOff.weekday}>
                  <td style={{ border: "none", float: "left", marginTop: 8 }}>
                    <strong>{cutOff.weekday}</strong>
                  </td>
                  <td style={{ border: "none" }}>
                    <TextField
                      select
                      // label="From"
                      value={cutOff.fromTime}
                      onChange={handleTimeChange(index, "fromTime")}
                      variant="outlined"
                      size="small"
                      style={{ width: "100px" }}
                    >
                      {timeSlots.map((timeSlot) => (
                        <MenuItem key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                  <td style={{ border: "none" }}>
                    <TextField
                      select
                      // label="To"
                      value={cutOff.toTime}
                      onChange={handleTimeChange(index, "toTime")}
                      variant="outlined"
                      size="small"
                      style={{ width: "100px" }}
                    >
                      {timeSlots.map((timeSlot) => (
                        <MenuItem key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>

        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
}
