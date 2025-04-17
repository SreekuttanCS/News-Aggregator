import jwt from "jsonwebtoken";
import User from "../model/User.js";

const protect = async (req, res, next) => {
  if (
    req.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.header.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(decode.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ error: "Invalid token" });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Not authorized,token fail" });
    }
  } else {
    res.status(404).json({ message: "No token, authorized fail" });
  }
};
export default protect;
