import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { serverrun } from "./misc/constants";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const cors = require("cors");
const app: Express = express();
const PORT = process.env.PORT || 8000;

//Middlewares:
app.use(cors());
app.use(express.json());

//Base Route:
app.use("/", userRoutes);

//Database connection:
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log(serverrun))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
