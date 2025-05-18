export const isAdmin = (req, res, next) => {
  console.log("User info:", req.user);

  if (req.user?.role == "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied.Admin Only" });
  }
};
