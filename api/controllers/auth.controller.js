import User from "../models/user.model.js"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the password with bcryptjs

  const newUser = new User({
    username,
    email,
    password: hashedPassword, // Store the hashed password in the database
  });

  try {
    await newUser.save(); // Save the new user to the database
    res.json({ message: "Signup succeed" }); // Send a success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
