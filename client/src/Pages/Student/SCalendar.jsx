import React, { useEffect, useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./css/SCalendar.css";
import { fetchEvents } from "../../api/eventApi";

const SCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        console.log("Events for Calendar:", fetchedEvents); // Log events for debugging
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    getEvents();
  }, []);

  return (
    <div>
      <SNavbar />
      <div className="calendarc">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events} // Pass events to FullCalendar
        />
      </div>
    </div>
  );
};

export default SCalendar;
