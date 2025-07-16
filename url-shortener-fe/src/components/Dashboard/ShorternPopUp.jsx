// ShorternPopUp.js
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material"; // Added missing imports
import CreateNewShortern from "./CreateNewShortern"; // Import your form component

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ShorternPopUp = ({ open, setOpen, refetch }) => {
    const handleClose = () => {
     setOpen(false);
    };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center justify-center h-screen">
        <CreateNewShortern 
          setOpen={setOpen} 
          refetch={refetch} 
        />
      </div>
    </Modal>
  );
};

export default ShorternPopUp;