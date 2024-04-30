import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context";

export default function OverallInfo() {
  const { formValues } = useContext(AppContext);

  const [rows, setRows] = useState<{ label: string; value: any }[]>([]);

  useEffect(() => {
    const {
      stream,
      bookingHospital,
      crHospital,
      bedType,
      ward,
      bookingModule,
      exclusionCriteria,
    } = formValues;

    let newRows = [
      { label: "Stream", value: stream.value },
      { label: "Booking Hospital", value: bookingHospital.value },
      { label: "C/R Hospital", value: crHospital.value },
      { label: "Bed Type", value: bedType.value },
      { label: "Ward", value: ward.value },
      { label: "Booking Module", value: bookingModule.value },
      { label: "Exclusion Criteria", value: exclusionCriteria.value },
    ];

    if (bookingModule.value === "Manual") {
      newRows = newRows.filter((row) => row.label !== "Exclusion Criteria");
    }

    setRows(newRows);
  }, [formValues]);

  return (
    <Grid container spacing={2}>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {rows.map((row) =>
              row.value ? (
                <TableRow key={row.label}>
                  <TableCell style={{ width: "30%" }}>
                    <strong>{row.label}</strong>
                  </TableCell>
                  <TableCell style={{ width: "70%" }}>{row.value}</TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
