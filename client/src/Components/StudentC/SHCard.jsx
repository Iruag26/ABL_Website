import React from 'react';
import './css/SHCard.css';

const SHCard = ({ event }) => {
  return (
    <div>
      <div className="activity-card">
        <img
          src={event.image || "https://via.placeholder.com/150"} // Placeholder if no image
          className="card-img-top"
          alt={event.e_name}
        />
        <div className="card-body">
          <h5 className="card-title">{event.e_name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Type: {event.e_type}</li>
          <li className="list-group-item">Category: {event.e_category}</li>
          <li className="list-group-item">Cost: {event.e_cost}</li>
          <li className="list-group-item">Date: {event.e_date}</li>
          <li className="list-group-item">Organizer: {event.e_org}</li>
        </ul>
        <div className="card-body">
          <a
            href={event.e_link}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Registration link
          </a>
        </div>
      </div>
    </div>
  );
};

export default SHCard;

