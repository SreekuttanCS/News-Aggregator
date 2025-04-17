import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRouter from "./src/router/userRouter.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(" Server is running on port", PORT);
});
