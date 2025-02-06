import express from "express";
import session from "express-session";
//import pg from "pg";
import PgSession from "connect-pg-simple";
import { sequelize, connection } from "./postgres/postgres.js";
import cors from "cors"; // Import CORS middleware
import eventRoutes from "./Routes/eventRoutes.js"; // Import event routes
import adminRoutes from "./Routes/adminRoutes.js";
import {
  getStudentCredentials,
  verifyStudentRole,
} from "./controller/studentController.js";
import { getAdminCredentials } from "./controller/adminController.js";
import { getMentorCredentials } from "./controller/mentorController.js";

const app = express();

// Session Middleware
app.use(
  session({
    store: new (PgSession(session))({
      pool: sequelize.connectionManager.pool, // Use Sequelize pool
      tableName: "session", // Store sessions in this table
    }),
    secret: "mySecretKey", // Change to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents client-side JS access
      maxAge: 1000 * 60 * 60, // 1-hour session
    },
  })
);

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());

// Routes
app.get("/students/credentials/:username", getStudentCredentials);
app.get("/students/verify-role/:s_id", verifyStudentRole);
app.get("/admin/credentials/:username", getAdminCredentials);
app.get("/mentor/credentials/:username", getMentorCredentials);

// Session Check Route
app.get("/session", (req, res) => {
  if (req.session.user) {
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
app.use("/add-mentor", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

connection();