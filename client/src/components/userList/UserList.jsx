import React, { useState } from "react";
import "../../App.css";
import { Button, Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DetailsModal from "../modals/detailsModal/DetailsModal";
import AddModal from "../modals/addModal/AddModal";

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

function UserList() {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // close Modal
  const handleClose = () => setOpen(false);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [user, setUser] = useState([
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
  ]);

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
        <DetailsModal
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
        />
        <AddModal
          open={openAddModal}
          handleCloseAddModal={handleCloseAddModal}
        />
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

export default UserList;
