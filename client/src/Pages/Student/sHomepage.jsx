import React, { useEffect, useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import "./css/sHomepage.css";
import { fetchLatest20Events } from "../../api/studentApi";
import { Link } from "react-router-dom";

const sHomepage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventData = await fetchLatest20Events();
        setEvents(eventData);
        setFilteredEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const eventMonth = new Date(event.e_date).getMonth() + 1; // Jan = 1
      const isMonthMatch = monthFilter
        ? parseInt(monthFilter) === eventMonth
        : true;
      const isTypeMatch =
        typeFilter === "Internal"
          ? event.e_level === "Intra-Collegiate"
          : typeFilter === "External"
          ? event.e_level !== "Intra-Collegiate"
          : true;
      return isMonthMatch && isTypeMatch;
    });
    setFilteredEvents(filtered);
  }, [monthFilter, typeFilter, events]);

  const bannerImages = filteredEvents.slice(0, 4);

  return (
    <div>
      <SNavbar />

      {/* Banner Carousel */}
      <div
        id="carouselExampleFade"
        className="news carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          {bannerImages.map((event, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={event.e_id}
            >
              <img
                src={
                  event.e_img
                    ? `data:image/jpeg;base64,${event.e_img}`
                    : "https://via.placeholder.com/1200x400?text=Event+Image"
                }
                className="d-block w-100"
                alt={event.e_name}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Filters */}
      <div className="container my-4 d-flex gap-4">
        <div>
          <label className="form-label ugh">Filter by Month</label>
          <select
            className="form-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option value={i + 1} key={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label ugh">Type</label>
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </select>
        </div>
      </div>

      {/* Event Cards */}
      <div className="event-info-cards-section container my-4">
        <h2 className="text-center mb-4">Latest Events</h2>
        <div className="row">
          {loading ? (
            <p className="text-center">Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-center">No events found.</p>
          ) : (
            filteredEvents.map((event) => (
              <div className="col-md-3 mb-4" key={event.e_id}>
                <Link
                  to={`/event-details/${event.e_id}`}
                  className="card text-decoration-none text-dark h-100"
                >
                  <img
                    src={
                      event.e_img
                        ? `data:image/jpeg;base64,${event.e_img}`
                        : "https://via.placeholder.com/400x200?text=Event+Image"
                    }
                    className="card-img-top"
                    alt={event.e_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.e_name}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        Date: {event.e_date?.slice(0, 10)}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Organizer: {event.e_org}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Fee:{" "}
                        {event.e_cost === 0 || event.e_cost === null
                          ? "Free"
                          : `₹${event.e_cost}`}
                      </small>
                    </p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default sHomepage;
