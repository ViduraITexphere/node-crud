import express from "express";
const router = express.Router();
import {
  addUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

router.post("/", addUser);
router.get("/", getUser);
router.put("/update", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
