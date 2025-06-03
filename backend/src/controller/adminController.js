import bcrypt from "bcryptjs";
import Admin from "../model/Admin.js";
import User from "../model/User.js";
import UserNews from "../model/UserNews.js";

export const adminCreate = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exist" });
    }
    let saveAdmin = new Admin({ name, email, password, role });

    let savedAdmin = await saveAdmin.save();
    const token = saveAdmin.generateAuthToken();

    res.status(201).json({ message: "Admin created successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating admin", err });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).josn({ message: "Email not found" });

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = admin.generateAuthToken();

    res.status(200).json({ message: "Successfully LoggedIn", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in", err });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (user.length === 0) {
      return res.status(404).json({ message: "No User found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", err });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user", err });
  }
};
export const getAllNews = async (req, res) => {
  try {
    const news = await UserNews.find();
    if (!news) {
      return res.status(404).json({ message: "No News found" });
    }
    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news", err });
  }
};

export const deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await UserNews.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete news", err });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete User", err });
  }
};
export const adminDashboard = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    const totalNews = await UserNews.countDocuments();
    const recentNews = await UserNews.find().sort({ createdAt: -1 }).limit(5);
    const recentUser = await User.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
      totalUser,
      totalNews,
      recentNews,
      recentUser,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
