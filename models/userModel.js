import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email address"],
      unique: [true, "This email address is already used. Please try another one."],
      match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password should be at least 8 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: String,
      default: "none"
    },
    phone: {
      type: Number,
      unique: [true, "This Phone Number is already used. Please try another one."],
      required: [true, "Please enter a Phone Number"],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'preferNotToSay'],
      default: 'preferNotToSay',
    },
  },
  {
    collection: "user",
  }
);

const userModel = model("user", userSchema);

export default userModel;