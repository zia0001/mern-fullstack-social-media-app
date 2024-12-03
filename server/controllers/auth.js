import bcrypt from "bcrypt";   // for password encryption 
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register USER */
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
      occupation
    } = req.body;       // destructoring these parameters from request body means from frontend we have send an object having these params
    const salt = await bcrypt.genSalt(); // for password encryption so that the password does not get exposed
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist.n" });

    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;   // so that it does sent back to front-end
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};