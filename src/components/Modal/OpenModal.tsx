import React, { ReactNode, useContext } from "react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { AppContext } from "../../Context";

interface OpenModalProps {
  children: ReactNode;
  title: String;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  borderRadius: 8,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  p: 4,
};

const dividerStyle = {
  width: "100%",
  margin: "12px 0",
};

const buttonStyle = {
  marginTop: 16,
};

export const OpenModal: React.FC<OpenModalProps> = ({ children, title }) => {
  const { modal, openModal } = useContext(AppContext);

  return (
    <Modal
      open={modal}
      onClose={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {/* <Divider sx={dividerStyle} /> */}
        <Box sx={{ mb: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
};
