import Events from "../postgres/model/Events.js"; // Import the Sequelize model
import multer from "multer"; // For file uploads

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
});

// Controller to add an event
export const addEvent = async (req, res) => {
  try {
    const { e_name, e_org, e_cost, e_type, e_category, e_date, e_link } = req.body;
    const e_img = req.file ? req.file.buffer : null; // Process image data if provided

    // Insert the event into the database
    const newEvent = await Events.create({
      e_name,
      e_org,
      e_cost,
      e_type,
      e_category,
      e_img,
      e_date,
      e_link,
    });

    res.status(201).json({ message: "Event added successfully!", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event." });
  }
};

export const addEvent2 = async (req, res) => {
  try {
    const { e_name, e_type, e_link } = req.body;

    const newEvent = await Events.create({
      e_name,
      e_type,
      e_link,
    });

    res.status(201).json({ message: "Event added successfully!", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event." });
  }
};
// Export multer middleware for file handling
export const uploadMiddleware = upload.single("e_img");

// Controller to fetch e_name, e_date, e_link fields from the database
export const fetchEvents = async (req, res) => {
  try {
    // Fetch only specific fields
    const events = await Events.findAll({
      attributes: ["e_name", "e_date", "e_link"], // Select specific fields
    });

    res.status(200).json(events); // Respond with the fetched events
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
};

export const fetchEvents2 = async (req, res) => {
  try {
    // Fetch only specific fields
    const events = await Events.findAll({
      attributes: ["e_name","e_img","e_type","e_category","e_date","e_org","e_link"], 
    });
    res.status(200).json(events); // Respond with the fetched events
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
};