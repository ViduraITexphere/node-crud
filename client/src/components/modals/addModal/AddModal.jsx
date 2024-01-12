import { Box, Modal, Input } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  borderRadius: "12px",
};

function AddModal({ open: openAddModal, handleCloseAddModal }) {
  const [user, setUser] = useState([]);
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("😀", user);
  };

  return (
    <div>
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="addModal__form" onSubmit={handleSubmit}>
            <Input
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <Input
              placeholder="Birth Date"
              name="birthDate"
              onChange={handleChange}
            />
            <Input
              placeholder="Address"
              name="address"
              onChange={handleChange}
            />
            <Input
              placeholder="Marital Status"
              name="maritalStatus"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddModal;
