import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; 

// Function to add an event
export const addEvent = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, formData); 
    return response.data; 
  } catch (error) {
    console.error("Error adding event:", error);
    throw error; 
  }
};

export const addEvent2 = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events2`, formData); 
    return response.data; 
  } catch (error) {
    console.error("Error adding event:", error);
    throw error; 
  }
};

// Fetch events from the backend
export const fetchEvents = async () => {
  try {
    const response = await axios.get("http://localhost:5000/events");
    console.log("API Response:", response.data);
    return response.data.map((event) => ({
      title: event.e_name, 
      date: event.e_date,  
      url: event.e_link,   
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEvents2 = async () => {
  try {
    const response = await axios.get("http://localhost:5000/events");
    console.log("API Response:", response.data);
    return response.data.map((event) => ({
      image: event.e_img,
      title: event.e_name, 
      type: event.e_type,
      category: event.e_category,
      date: event.e_date,  
      organizer: event.e_org,
      url: event.e_link,   
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};



