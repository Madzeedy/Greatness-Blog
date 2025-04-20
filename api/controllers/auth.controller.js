import User from "../models/user.model.js"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import errorHandler from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please fill in all fields.")); // Check if all fields are filled
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
    next(error); // Pass the error to the next middleware (error handler)
  }
};
