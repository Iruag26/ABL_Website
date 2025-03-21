import crypto from "crypto";
import Session from "../postgres/model/Session.js";
import { sequelize } from "../postgres/postgresmodel.js";

// Function to generate a secure session token
const generateSessionToken = () => {
    return crypto.randomBytes(64).toString("hex"); 
};

// Function to generate and store session token in a cookie
export const generateTokenForUser = async (req, res) => {
    try {
        const { username, user_type } = req.body; // Unified username field
        if (!username || !user_type) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        let userModel;
        let userIdField;
        let usernameField;

        if (user_type === "student") {
            userModel = "students"; 
            userIdField = "s_id"; 
            usernameField = "s_username";
        } else if (user_type === "mentor") {
            userModel = "mentors";
            userIdField = "m_id";
            usernameField = "m_username";
        } else if (user_type === "admin") {
            userModel = "admin";
            userIdField = "a_id";
            usernameField = "a_username";
        } else if (user_type === "club admin"){
            userModel = "students"; 
            userIdField = "s_id"; 
            usernameField = "s_username";
        }
        else {
            return res.status(400).json({ message: "Invalid user type" });
        }

        // Fetch the user ID from the correct table
        const query = `SELECT ${userIdField} FROM ${userModel} WHERE ${usernameField} = ?`;
        const [user] = await sequelize.query(query, { 
            replacements: [username], 
            type: sequelize.QueryTypes.SELECT 
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const user_id = user[userIdField]; // Get user ID

        // Convert user_id (INTEGER) to a UUID format string for the sessions table
        const user_uuid = `00000000-0000-0000-0000-${user_id.toString().padStart(12, '0')}`;

        // Generate a session token
        const sessionToken = generateSessionToken();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiration

        // Start transaction to ensure consistency
        await sequelize.transaction(async (t) => {
            await Session.destroy({ 
                where: { user_id: user_uuid }  
            }, { transaction: t });

            const newSession = await Session.create({
                user_id: user_uuid,
                user_type,
                session_token: sessionToken,
                expires_at: expiresAt
            }, { transaction: t });

            // 🔥 Set HTTP-only cookie with session token
            res.cookie("sessionToken", sessionToken, {
                httpOnly: true, // Prevents client-side access
                secure: false, // Change to true in production (HTTPS)
                sameSite: "lax", // Ensures cookies are sent cross-origin
                maxAge: 60 * 60 * 1000, // 1-hour expiration
                path: "/" // Ensures cookie is sent with all requests
            });

            res.json({ message: "Login successful, session stored in cookie!" });
        });

    } catch (error) {
        console.error("Error generating session token:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to handle user logout
export const logoutUser = async (req, res) => {
    try {
        console.log("🔹 Logging out user...");

        // 1️⃣ Get session token from cookies
        const sessionToken = req.cookies?.sessionToken;
        if (!sessionToken) {
            console.log("⛔ No session token found.");
            return res.status(401).json({ message: "Unauthorized: No session token found." });
        }

        // 2️⃣ Delete session from database
        await Session.destroy({ where: { session_token: sessionToken } });

        // 3️⃣ Clear the cookie
        res.clearCookie("sessionToken", {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "lax",
            path: "/",
        });

        console.log("✅ User logged out successfully.");
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error("❌ Error logging out:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
};
