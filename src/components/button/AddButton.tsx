import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import React, { CSSProperties } from "react";

interface ButtonProps {
    title: string;
    onClick: () => void;
    style?: CSSProperties; // Add a style prop
    // disabled?: boolean;
}

export const AddButton: React.FC<ButtonProps> = ({
    title,
    onClick,
    style
    // disabled = false,
}) => {
    return (
        <Tooltip title={title}>
            <IconButton
                aria-label="fingerprint"
                color="info"
                edge="start"
                style={{ marginTop: 25, ...style }}
                onClick={onClick}
            >
                <AddIcon />
            </IconButton>
        </Tooltip>
    );
};
