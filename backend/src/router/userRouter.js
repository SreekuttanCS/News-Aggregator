import express from "express";
import {
  createUser,
  getUserProfile,
  loginUser,
} from "../controller/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);


export default router;
