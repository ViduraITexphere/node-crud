import { db } from "../db.js";

// add user=============================================
export const addUser = (req, res) => {
  const q =
    "INSERT INTO users (`firstname`, `lastname`, `birthdate`, `address`, `maritalstatus`) VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.birthDate,
    req.body.address,
    req.body.maritalStatus,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error adding user:", err);
      res.status(500).send("Error adding user");
      return;
    }
    res.status(200).send("User added successfully");
  });
};

// get user=============================================
export const getUser = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error getting users:", err);
      res.status(500).send("Error getting users");
      return;
    }
    res.status(200).send(data);
  });
};

// update user=============================================
export const updateUser = (req, res) => {
  const q =
    "UPDATE users SET `firstname`=?, `lastname`=?, `birthdate`=?, `address`=?, `maritalstatus`=? WHERE `id`=?";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.birthdate,
    req.body.address,
    req.body.maritalstatus,
    req.body.id,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
      return;
    }
    res.status(200).send("User updated successfully");
  });
};

// delete user=============================================
export const deleteUser = async (req, res) => {
  const q = "DELETE FROM users WHERE `id`=?";
  const values = [req.params.id];

  try {
    const result = await db.query(q, values);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user");
  }
};
