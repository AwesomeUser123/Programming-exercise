import React, { useEffect, useState } from "react";
import "./event.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/event/viewEvent") // Replace with your actual API URL
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.name}>
            {event["image link"] && (
              <img src={event["image link"]} alt={event.name} />
            )}
            <div className="event-info">
              <h2>{event.name}</h2>
              <p>
                <strong>From:</strong> {formatDate(event["date of occurence"])}
              </p>
              <p>
                <strong>To:</strong> {formatDate(event["date of ending"])}
              </p>
              <p className="description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
