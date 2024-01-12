import React, { useState } from "react";
import "../../App.css";
import { Button, Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

const user = [
  {
    firstName: "James",
    lastName: "Matman",
    birthDate: "1981-07-17",
    address: "102 Long Lane, London, United Kingdom",
    maritalStatus: "married",
  },

  {
    firstName: "Jane",
    lastName: "Citizen",
    birthDate: "1980-12-25",
    address: "102 Long Lane, London, United Kingdom",
    maritalStatus: "married",
  },

  {
    firstName: "Fred",
    lastName: "Bloggs",
    birthDate: "1980-12-25",
    address: "102 Long Lane, London, United Kingdom",
    maritalStatus: "married",
  },

  {
    firstName: "Frank",
    lastName: "Sinatra",
    birthDate: "1915-12-12",
    address: "102 Long Lane, London, United Kingdom",
    maritalStatus: "married",
  },
];

function AddUser() {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpen = (userData) => {
    setSelectedUser(userData);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  return (
    <>
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

        <Modal
          open={openAddModal}
          onClose={handleCloseAddModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Birth Date" />
            <Input placeholder="Address" />
            <Input placeholder="Marital Status" />
          </Box>
        </Modal>
        <h1>Table</h1>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>D.O.B</th>
              <th>Address</th>
              <th>Marital Status</th>
            </tr>
          </thead>

          <tbody>
            {user.map((userData, index) => (
              <tr key={index} onClick={() => handleOpen(userData)}>
                <td>{userData.firstName}</td>
                <td>{userData.lastName}</td>
                <td>{userData.birthDate}</td>
                <td>{userData.address}</td>
                <td>{userData.maritalStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={handleOpenAddModal}>Open modal</Button>
    </>
  );
}

export default AddUser;
