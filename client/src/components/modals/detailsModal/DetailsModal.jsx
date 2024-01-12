import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  borderRadius: "12px",
};

function DetailsModal({ selectedUser, handleClose, open }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedUser && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {`${selectedUser.firstName} ${selectedUser.lastName}`}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Birth Date: {selectedUser.birthDate}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Address: {selectedUser.address}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Marital Status: {selectedUser.maritalStatus}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default DetailsModal;
