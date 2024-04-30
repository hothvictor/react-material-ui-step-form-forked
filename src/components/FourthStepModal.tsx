import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context";
import { OpenModal } from "./Modal/OpenModal";

interface OpenModalProps {
    title: String;
    updateDropdownOptions: (hospitalCode: string) => void;
}

interface Option {
    value: string;
    label: string;
}

const dividerStyle = {
    width: "100%",
    margin: "12px 0"
};

const buttonStyle = {
    marginTop: 16
};

export const FourthStepModal: React.FC<OpenModalProps> = ({ title, updateDropdownOptions }) => {
    const [optionValue, setOptionValue] = useState<string>("");
    const [optionList, setOptionList] = useState<Array<Option>>([]);

    const { openModal, variant, margin, formValues } = useContext(AppContext);

    const { stream } = formValues;

    useEffect(() => {
        if (stream.value === "MED")
            setOptionList([
                {
                    value: "(MED Stream) General Bed",
                    label: "(MED Stream) General Bed"
                },
                {
                    value: "(MED Stream) Surgical Bed",
                    label: "(MED Stream) Surgical Bed"
                }
            ]);
        else
            setOptionList([
                {
                    value: "(SUR Stream) Surgical Bed",
                    label: "(SUR Stream) Surgical Bed"
                },
                {
                    value: "(SUR Stream) Palliative Bed",
                    label: "(SUR Stream) Palliative Bed"
                }
            ]);
    }, [stream.value]);

    const handleChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const hosptialCode = value.target.value;
        setOptionValue(hosptialCode);
    };

    const handSubmit = () => {
        updateDropdownOptions(optionValue);
        const newOptions = optionList.filter((obj) => obj.value !== optionValue);
        setOptionList(newOptions);
        setOptionValue("");
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
                        native: true
                    }}
                    label="Bed Type"
                    name="bedType"
                    value={optionValue}
                    onChange={handleChange}
                >
                    <option value=""> </option>
                    {optionList.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Grid>
            {/* <Divider sx={dividerStyle} /> */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" sx={buttonStyle} onClick={handSubmit}>
                    Add
                </Button>
            </Box>
        </OpenModal>
    );
};
