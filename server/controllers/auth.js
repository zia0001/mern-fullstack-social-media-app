import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from 'path';
import fs from 'fs';
const __dirname = path.dirname(import.meta.url);


// Email and password validation using regular expressions
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

/* Register User */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const uploadedPicturePath = req.file ? `/assets/${req.file.filename}` : null;

    // Validation checks
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ msg: "your email must be abc@example.com" });
    }

    if (!password || !isValidPassword(password)) {
      return res.status(400).json({
        msg:
          "Password must be at least 8 characters, including one uppercase letter, one number, and one special character.",
      });
    }

    const salt = await bcrypt.genSalt(); // Generate a salt for hashing the password
    const passwordHash = await bcrypt.hash(password, salt); // Hash the password
    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // Store hashed password
      picturepath: uploadedPicturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });



    const savedUser = await newUser.save();

    // Fetch the saved user with password excluded
    const userWithoutPassword = await User.findById(savedUser._id).select(
      "-password"
    );

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Login User */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email address or password." });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        friends: user.friends,
        location: user.location,
        occupation: user.occupation,
        viewedProfile: user.viewedProfile,
        impressions: user.impressions,
        picturepath: user.picturepath,
      },
    });
  } catch (err) {
    console.error("[ERROR]-------------> ", err)
    res.status(500).json({ error: err.message });
  }
};

