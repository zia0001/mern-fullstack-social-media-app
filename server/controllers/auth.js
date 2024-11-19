import bcrypt from "bcrypt";   // for password encryption 
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* Register USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      LastName,
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
      LastName,
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

}
