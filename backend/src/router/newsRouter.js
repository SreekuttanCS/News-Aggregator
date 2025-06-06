import express from "express";
import {
  apiSearch,
  createNews,
  deleteNews,
  getCategoryFetch,
  getCategoryFetched,
  getFetchedNews,
  // getSingleNews,
  getUserNews,
  updateNews,
  userSearch,
} from "../controller/newsController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/fetchednews", getFetchedNews);
router.get("/search/external", apiSearch);
router.get("/search/user", userSearch);

router.post("/create", protect, upload.single("image"), createNews);
router.get("/fetchnews", getUserNews);
// router.get("/:id", getSingleNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

router.get("/category/:category", getCategoryFetch);
router.get("/category_user/:category", getCategoryFetched);

export default router;
