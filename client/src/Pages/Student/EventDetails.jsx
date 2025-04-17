import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SNavbar from "../../Components/StudentC/SNavbar";
import "./css/EventDetails.css";
import axios from "axios";

const EventDetails = () => {
  const { e_id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/events/${e_id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [e_id]);

  if (loading) {
    return (
      <div>
        <SNavbar />
        <div className="container text-center mt-5">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <SNavbar />
        <div className="container text-center mt-5">
          <h3>Event details not found.</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SNavbar />
      <div className="event-details-wrapper">
        <div className="event-details-container container my-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  event.e_img
                    ? `data:image/jpeg;base64,${event.e_img}`
                    : "https://via.placeholder.com/600x400?text=Event+Image"
                }
                alt={event.e_name}
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">{event.e_name}</h2>
              <p><strong>Organizer:</strong> {event.e_org || "N/A"}</p>
              <p><strong>Category:</strong> {event.e_category || "N/A"}</p>
              <p><strong>Type:</strong> {event.e_type || "N/A"}</p>
              <p><strong>Date:</strong> {event.e_date?.slice(0, 10) || "N/A"}</p>
              <p><strong>Registration Fee:</strong> {event.e_cost === 0 ? "Free" : `₹${event.e_cost}`}</p>
              <p><strong>Description:</strong></p>
              <p className="event-description">
                {event.e_description || "No description available."}
              </p>
              {event.e_link && (
                <a
                  href={event.e_link}
                  className="btn btn-success mt-3 me-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
