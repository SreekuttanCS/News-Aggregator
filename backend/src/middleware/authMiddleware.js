import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Admin from "../model/Admin.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "null" || token.length < 10) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let user = await User.findById(decoded.id).select("-password");
    let role = "user";

    if (!user) {
      user = await Admin.findById(decoded.id).select("-password");
      if (user) {
        role = "admin";
      }
    }

    if (!user) {
      return res.status(401).json({ error: "User not found, token invalid" });
    }

    req.user = {
      ...user.toObject(),
      role,
    };

    next();
  } catch (err) {
    console.error("Token error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(401).json({ message: "Token verification failed" });
  }
};

export default protect;
