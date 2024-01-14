import React, { useState } from "react";
import { Box, Modal, OutlinedInput } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#3cd684",
  boxShadow: 24,
  p: 4,
  color: "#0a120c",
  borderRadius: "8px",
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  borderRadius: "5px",
  fontSize: "14px",
  fontFamily: "Unbounded",
  textTransform: "capitalize",
  color: "#404a42",
};

function AddModal({ open: openAddModal, handleCloseAddModal }) {
  const [user, setUser] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        toast.success("User added successfully");
        handleCloseAddModal();
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("An error occurred while adding user");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="addModal__form" onSubmit={handleSubmit}>
            <OutlinedInput
              sx={inputStyle}
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
            />
            <OutlinedInput
              sx={inputStyle}
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            <OutlinedInput
              sx={inputStyle}
              placeholder="Birth Date"
              name="birthDate"
              onChange={handleChange}
            />
            <OutlinedInput
              sx={inputStyle}
              placeholder="Address"
              name="address"
              onChange={handleChange}
            />
            <OutlinedInput
              sx={inputStyle}
              placeholder="Marital Status"
              name="maritalStatus"
              onChange={handleChange}
            />
            <button type="submit">Save User</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddModal;
