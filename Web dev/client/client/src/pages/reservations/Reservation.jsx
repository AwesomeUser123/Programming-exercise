import { useEffect, useState } from "react";
import axios from "axios";
import "./reservation.scss";

const Reservation = () => {
const [groupedSlots, setGroupedSlots] = useState({});
const [selectedTimestamp, setSelectedTimestamp] = useState(null);
const [error, setError] = useState("");

const tables = selectedTimestamp
  ? Object.values(groupedSlots)
      .flat()
      .filter((slot) => slot.timestamp_slot === selectedTimestamp)
  : [];

const fetchSlots = async () => {
  try {
    const res = await axios.get("http://localhost:8800/api/reservation/available");
    const grouped = res.data.reduce((acc, slot) => {
      const date = new Date(slot.timestamp_slot).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(slot);
      return acc;
    }, {});
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => new Date(a.timestamp_slot) - new Date(b.timestamp_slot));
    });
    setGroupedSlots(grouped);
  } catch {
    setError("Failed to fetch slots.");
  }
};

useEffect(() => {
  fetchSlots();
  const intervalId = setInterval(fetchSlots, 10000);
  return () => clearInterval(intervalId);
}, []);

const handleTimestampClick = (timestamp) => {
  setSelectedTimestamp(timestamp);
};

const handleBook = async (tableId) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user?.username;
  if (!username) {
    alert("We cannot find your username, please try to log in again");
    return;
  }


  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  try {
    await axios.post("http://localhost:8800/api/service/book", {
      username: username,
      table_id: tableId,
      timestamp_slot: formatDateTime(selectedTimestamp),
    });
    alert("Booked successfully!");
    fetchSlots(); // refresh after booking
  } catch {
    setError("Booking failed.");
  }
};




  return (
    <div className="reservation-page">
      <h2>Reserve Your Table</h2>
      {error && <p className="error">{error}</p>}
      <div className="calendar-container">
        {Object.entries(groupedSlots).map(([day, slots]) => (
          <div className="day-group" key={day}>
            <h3>{day}</h3>
            <div className="timestamps">
              {[...new Set(slots.map((slot) => slot.timestamp_slot))].map(
                (timestamp) => (
                  <button
                    key={timestamp}
                    className={`timestamp-btn ${
                      selectedTimestamp === timestamp ? "active" : ""
                    }`}
                    onClick={() => handleTimestampClick(timestamp)}
                  >
                    {new Date(timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedTimestamp && (
        <div className="tables-section">
          <h4>
            Tables Available at{" "}
            {new Date(selectedTimestamp).toLocaleTimeString()}
          </h4>
          <ul className="table-list">
            {tables.map((slot) => (
              <li key={slot.id}>
                Table {slot.table_id} - {slot.time_range_label}
                <button onClick={() => handleBook(slot.table_id)}>Book</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reservation;
