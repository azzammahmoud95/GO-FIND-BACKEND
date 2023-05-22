
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

//***************** REGISTER USER *********************************/
export const register = async (req, res) => {
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
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const user = new userModel({
      username,
      email,
      password: hashPassword,
      isAdmin,
      dateOfBirth,
      phone,
      gender,
    });

    await user.save();

    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};


//***************** LOGIN USER ***************/

export const login = async (req, res, next) => {
  // res.status(200).json({ message: "Login Admin" });
  let { email, password } = req.body;

  // Check and get the Admin
  const user = await userModel.findOne({ email });
 const token =  generateToken(user._id)
 res.cookie('token', token, { httpOnly: true, maxAge: 900000 });

  if (user && (await bcrypt.compare(password, user.password))) {

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: token,
      isAdmin: user.isAdmin,
      phone: user.phone,
    });
    const {password, ...otherDetails } = user._doc;
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
};

//**************** Generate token *****************************/ 

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//****************** DELETE USER *******************************/
export const deleteUserById = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id).then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Not Found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "User Deleted successfully" });
      }
    });
  } catch (error) {
    res.json({ err: error.message });
  }
};

//***************** EDIT USER **********************/
export const editUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    let newHashedPassword = bcrypt.hashSync(req.body.password, salt);

    let update = {
      username: req.body.username,
      email: req.body.email,
      password: newHashedPassword,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      isAdmin: req.body.isAdmin,
    };
    const user = await userModel.findById(req.params.id);

    // check if the admin does not exist
    if (!user) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
    if(req.body.username || req.body.email || req.body.phone){
      return res.status(403).json({ status: 403, message:"Can't change username or email or Phone"});
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ message: "Admin Updated Successfully", changes: updatedUser });
  } catch (error) {
    res.json({ err: error.message });
  }
};

