import React, { useEffect, useState } from "react";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchEvents } from "../../api/eventApi";
import "./css/CAdCalendar.css"
const CAdCalendar = () => {
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
      <CAdNavbar />
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

export default CAdCalendar;
