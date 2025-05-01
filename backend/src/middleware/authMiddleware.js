import jwt from "jsonwebtoken";
import User from "../model/User.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token.length < 10) {
      return res.status(401).json({ message: "Invalid or missing token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "User not found, token invalid" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Token error:", err.message);
      res.status(401).json({ message: "Token verification failed" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

export default protect;
