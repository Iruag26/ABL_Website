// import React, { useEffect, useState } from "react";
// import SNavbar from "../../Components/StudentC/SNavbar";
// import "./css/sHomepage.css";
// import event1img from "../../assets/event1.jpeg";
// import event2img from "../../assets/event2.jpeg";
// import event3img from "../../assets/event3.png";

// const sHomepage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const eventData = await fetchEvents2();
//         console.log("Fetched events:", eventData);
//         setEvents(eventData);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getEvents();
//   }, []);

//   // Dummy static cards array for demonstration (20 items)
//   const dummyCards = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     title: `Sample Event ${index + 1}`,
//     text: `This is sample text for event ${index + 1}.`,
//     date: "2025-12-31",
//     organizer: "Sample Organizer",
//     url: "#",
//     // You can set a placeholder image or use one of your imports
//     image: event1img,
//   }));

//   return (
//     <div>
//       <SNavbar />
//       <div id="carouselExampleFade" className="news carousel slide carousel-fade">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src={event1img} className="d-block w-100" alt="Event 1" />
//           </div>
//           <div className="carousel-item">
//             <img src={event2img} className="d-block w-100" alt="Event 2" />
//           </div>
//           <div className="carousel-item">
//             <img src={event3img} className="d-block w-100" alt="Event 3" />
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleFade"
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleFade"
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//       <div className="event-info-cards-section container my-4">
//         <h2 className="text-center mb-4">Latest Events</h2>
//         <div className="row">
//           {dummyCards.map((card) => (
//             <div className="col-md-3 mb-4" key={card.id}>
//               <div className="card">
//                 <img
//                   src={card.image}
//                   className="card-img-top"
//                   alt={card.title}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{card.title}</h5>
//                   <p className="card-text">{card.text}</p>
//                   <p className="card-text">
//                     <small className="text-muted">Date: {card.date}</small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       Organizer: {card.organizer}
//                     </small>
//                   </p>
//                   <a href={card.url} className="btn btn-primary">
//                     More Info
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default sHomepage;

import React, { useEffect, useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import "./css/sHomepage.css";
import event1img from "../../assets/event1.jpeg";
import event2img from "../../assets/event2.jpeg";
import event3img from "../../assets/event3.png";
import event4img from "../../assets/event4.jpg";

const sHomepage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventData = await fetchEvents2();
        console.log("Fetched events:", eventData);
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  // Dummy static cards array for demonstration (20 items)
  // Cycle through the four images for variety.
  const images = [event1img, event2img, event3img, event4img];
  const dummyCards = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Sample Event ${index + 1}`,
    text: `This is sample text for event ${index + 1}.`,
    date: "2025-12-31",
    organizer: "Sample Organizer",
    url: "#",
    image: images[index % images.length],
  }));

  return (
    <div>
      <SNavbar />
      <div id="carouselExampleFade" className="news carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={event1img} className="d-block w-100" alt="Event 1" />
          </div>
          <div className="carousel-item">
            <img src={event2img} className="d-block w-100" alt="Event 2" />
          </div>
          <div className="carousel-item">
            <img src={event3img} className="d-block w-100" alt="Event 3" />
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
      <div className="event-info-cards-section container my-4">
        <h2 className="text-center mb-4">Latest Events</h2>
        <div className="row">
          {dummyCards.map((card) => (
            <div className="col-md-3 mb-4" key={card.id}>
              <div className="card">
                <img src={card.image} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <p className="card-text">
                    <small className="text-muted">Date: {card.date}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Organizer: {card.organizer}
                    </small>
                  </p>
                  <a href={card.url} className="btn btn-primary">
                    Register
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default sHomepage;