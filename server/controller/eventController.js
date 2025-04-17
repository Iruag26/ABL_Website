import Events from "../postgres/model/Events.js"; // Import the Sequelize model
import multer from "multer"; // For file uploads

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
});

// Controller to add an event
export const addEvent = async (req, res) => {
  try {
    const {
      e_name,
      e_org,
      e_cost,
      e_type,
      e_category,
      e_date,
      e_start_time,     // ✅ New
      e_end_time,       // ✅ New
      e_link,
      e_description,
    } = req.body;

    const e_img = req.file ? req.file.buffer : null;

    const newEvent = await Events.create({
      e_name,
      e_org,
      e_cost,
      e_type,
      e_category,
      e_img,
      e_date,
      e_start_time,    // ✅ Save to DB
      e_end_time,      // ✅ Save to DB
      e_link,
      e_description,
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
    const events = await Events.findAll({
      attributes: ["e_name", "e_date", "e_start_time", "e_end_time", "e_link"],
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
};


export const fetchEvents2 = async (req, res) => {
  try {
    // Fetch only specific fields, order by date descending and limit to 20 events
    const events = await Events.findAll({
      attributes: ["e_name", "e_img", "e_type", "e_category", "e_date", "e_org", "e_link"],
      order: [["e_date", "DESC"]], // sorts by date (latest first)
      limit: 20, // return only 20 events
    });
    res.status(200).json(events); // Respond with the fetched events
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
};


export const fetchEventById = async (req, res) => {
  const { e_id } = req.params;

  try {
    const event = await Events.findByPk(e_id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Convert image to base64 if present
    const eventData = event.toJSON();
    if (event.e_img) {
      eventData.e_img = Buffer.from(event.e_img).toString("base64");
    }

    res.json(eventData);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
