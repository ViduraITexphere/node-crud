import express from "express";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server listening on port 3000");
});
