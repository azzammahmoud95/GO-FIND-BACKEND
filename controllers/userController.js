
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
// *************** GET ALL USERS *********************
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    res.status(200).json({ message: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ***************** GET USER BY ID ****************
export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json({ message: user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//***************** REGISTER USER */
export const register = async (req, res, next) => {
  try {
    const { email, password, username, isAdmin, dateOfBirth, phone, gender } = req.body;

    // Fields Validation
    if (!email || !password || !username || !phone) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const existingAdmin = await userModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const existingPhone = await userModel.findOne({ phone });
    if (existingPhone) {
      return res.status(401).json({ message: "Phone already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt)
    // Create a new user
    const user = new userModel({
      username,
      email,
      password: hashPassword,
      isAdmin,
      dateOfBirth,
      phone,
      gender 
    });

    await user.save();

    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};


