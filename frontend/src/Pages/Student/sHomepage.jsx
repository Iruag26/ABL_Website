import React, { useEffect, useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import SHCard from "../../Components/StudentC/SHCard";
import "./css/sHomepage.css";
import { fetchEvents2 } from "../../api/eventApi"; 

const sHomepage = () => {
  const [events, setEvents] = useState([]); 
  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventData = await fetchEvents2(); 
        setEvents(eventData); 
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getEvents();
  }, []);
  return (
    <div>
      <SNavbar />
      <div id="carouselExampleFade" className="news carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="event-info-cards-section">
        {events.map((event, index) => (
          <SHCard key={index} event={event} /> 
        ))}
      </div>
    </div>
  );
};

export default sHomepage;