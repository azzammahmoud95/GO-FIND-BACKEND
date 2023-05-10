import { Admin } from "mongodb";
import userModel from "../models/userModel.js";

// *************** GET ALL USERS *********************
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    res.status(200).json({ message: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json({ message: user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const register = async (req, res, next) => {
  let { email, password, username, isAdmin, dateOfBirth, phone, gender } = req.body;
  // Fields Validation
  if (!email || !password || !username || !phone) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  const checkAdmin = await userModel.findOne({ email });
  if (checkAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const checkPhone = await userModel.findOne({ phone });
  if (checkPhone) {
    return res.status(401).json({ message: "Phone already exists" });
  }

  // Create a new user
  const user = new userModel({
    username,
    email,
    password,
    isAdmin,
    dateOfBirth,
    phone,
    gender 
  });

  try {
    await user.save();
    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

