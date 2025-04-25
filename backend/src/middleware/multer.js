import multer from "multer";
import { storage } from "./cloudinaryMiddileware.js";

const upload = multer({ storage });

export default upload;
