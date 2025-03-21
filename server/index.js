import express from "express";
import session from "express-session";
import cors from "cors"; // Import CORS middleware
import cookieParser from "cookie-parser";

import { sequelize, connection } from "./postgres/postgresmodel.js";

import eventRoutes from "./Routes/eventRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import sessionRoutes from "./Routes/sessionRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import mentorRoutes from "./Routes/mentorRoutes.js"; // 🔹 Registering mentor routes here

import { validateSession } from "./middleware/authMiddleware.js";

import {
  getStudentCredentials,
  verifyStudentRole,
} from "./controller/studentController.js";
import { getAdminCredentials } from "./controller/adminController.js";
import { getMentorCredentials } from "./controller/mentorController.js";


const app = express();

app.use(express.json());
app.use(cookieParser()); 

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Register Routes
app.use("/api/session", sessionRoutes);
app.use("/api/mentor", mentorRoutes); // 🔹 This automatically includes all mentor-related routes
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

// 🔹 Add Protected Route Here (After Session Routes)
app.get("/api/protected-route", validateSession, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

// Routes
app.get("/students/credentials/:username", getStudentCredentials);
app.get("/students/verify-role/:s_id", verifyStudentRole);
app.get("/admin/credentials/:username", getAdminCredentials);
app.get("/mentor/credentials/:username", getMentorCredentials);

// Session Check Route
app.get("/session", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.use("/", eventRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

connection();
