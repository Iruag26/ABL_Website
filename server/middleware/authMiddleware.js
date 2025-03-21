import Session from "../postgres/model/Session.js";

export const validateSession = async (req, res, next) => {
    try {
        console.log("🔹 Checking session...");

        // 1️⃣ Get session token from cookies
        const sessionToken = req.cookies?.sessionToken; 
        console.log("🔹 Received Session Token:", sessionToken);

        if (!sessionToken) {
            console.log("⛔ No session token found.");
            return res.status(401).json({ message: "Unauthorized: No session token found." });
        }

        // 2️⃣ Check if session exists in the database
        const session = await Session.findOne({ where: { session_token: sessionToken } });

        if (!session) {
            console.log("⛔ Invalid session: Not found in database.");
            return res.status(401).json({ message: "Unauthorized: Invalid session." });
        }

        // 3️⃣ Check if session has expired
        const sessionExpiry = new Date(session.expires_at);
        console.log("🔹 Session Expires At:", sessionExpiry);

        if (sessionExpiry < new Date()) {
            console.log("⛔ Session expired.");
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        // 4️⃣ If session is valid, proceed
        console.log("✅ Session is valid. Allowing access.");
        req.user = { user_id: session.user_id, user_type: session.user_type };
        next();
    } catch (error) {
        console.error("❌ Error validating session:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
};
