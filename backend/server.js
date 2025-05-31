import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import userRouter from "./src/router/userRouter.js";
import newsRouter from "./src/router/newsRouter.js";
import adminRouter from "./src/router/adminRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/news", newsRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(" Server is running on port", PORT);
});
