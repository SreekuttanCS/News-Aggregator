import express from "express";
import {
  adminCreate,
  adminDashboard,
  deleteNewsById,
  deleteUser,
  getAllNews,
  getAllUser,
  getUserById,
  loginAdmin,
} from "../controller/adminController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, adminDashboard);
router.post("/signin", adminCreate);
router.post("/login", loginAdmin);

router.get("/users", protect, isAdmin, getAllUser);
router.get("/users/:id", protect, isAdmin, getUserById);
router.delete("/users/:id", protect, isAdmin, deleteUser);

router.get("/news", protect,  isAdmin, getAllNews);
router.delete("/news/:id", protect, isAdmin, deleteNewsById);

export default router;
