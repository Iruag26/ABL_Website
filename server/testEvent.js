import fetch from "node-fetch"; // Install if not available

const testSessionAPI = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/session/generate-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "1021101",
                user_type: "student"
            })
        });

        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error testing API:", error);
    }
};

testSessionAPI();
