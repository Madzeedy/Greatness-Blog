import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js"; // Import auth routes

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();

app.use(express.json()); // Allow posting/sending JSON

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes); // Add this line to include the auth routes
