import User from "../models/user.model.js"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Please fill in all fields.")); // Check if all fields are filled
  }

  try {
    const validUser = await User.findOne({ email }); // Find the user by email

    if (!validUser) {
      return next(errorHandler(404, "User not found.")); // If user not found, send error
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password.")); // If password is invalid, send error
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // Create a JWT token

    const { password: pass, ...rest } = validUser._doc; // Exclude password from user data

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest); // Send the token in a cookie along with user data
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};
