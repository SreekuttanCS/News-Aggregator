import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    let saveUser = new User({ name, email, password, role });

    let savedUser = await saveUser.save();
    const token = saveUser.generateAuthToken();

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user", err });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
   
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = user.generateAuthToken();

    res.status(200).json({ message: "Successfully LoggedIn", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in", err });
  }
};

export const getUserProfile = (req, res) => {
  req.json(req.user);
};
