import React from "react";
import { Box, Button, Modal, OutlinedInput, Typography } from "@mui/material";
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

function EditModal({ selectedUser, handleClose, open, setSelectedUser }) {
  // Fetch request to update user
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });

      if (res.ok) {
        toast.success("User updated successfully");
        handleClose();
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating user");
    }
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedUser && (
            <>
              <form onSubmit={handleSave}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontFamily: "Russo One" }}
                >
                  First name
                </Typography>
                <OutlinedInput
                  sx={inputStyle}
                  placeholder="First Name"
                  value={selectedUser.firstname}
                  name="firstName"
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstname: e.target.value,
                    })
                  }
                />
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontFamily: "Russo One" }}
                >
                  Last name
                </Typography>

                <OutlinedInput
                  sx={inputStyle}
                  placeholder="Last Name"
                  value={selectedUser.lastname}
                  name="lastName"
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastname: e.target.value,
                    })
                  }
                />

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontFamily: "Russo One" }}
                >
                  Birth date
                </Typography>
                <OutlinedInput
                  sx={inputStyle}
                  placeholder="Birth Date"
                  value={selectedUser.birthdate}
                  name="birthDate"
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      birthdate: e.target.value,
                    })
                  }
                />

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontFamily: "Russo One" }}
                >
                  Address
                </Typography>
                <OutlinedInput
                  sx={inputStyle}
                  placeholder="Address"
                  value={selectedUser.address}
                  name="address"
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: e.target.value,
                    })
                  }
                />

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontFamily: "Russo One" }}
                >
                  Marital status
                </Typography>
                <OutlinedInput
                  sx={inputStyle}
                  placeholder="Marital Status"
                  value={selectedUser.maritalstatus}
                  name="maritalStatus"
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      maritalstatus: e.target.value,
                    })
                  }
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    type="submit"
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
