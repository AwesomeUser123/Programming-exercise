import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.scss";

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user?.username;

  const toLocalMySQLFormat = (utcDateStr) => {
    const local = new Date(utcDateStr);
    const offsetMs = local.getTimezoneOffset() * 60 * 1000; // in ms
    const adjusted = new Date(local.getTime() - offsetMs);
    return adjusted.toISOString().slice(0, 19).replace("T", " ");
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/service/bookInfo", {
        params: { username }
      });
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch your bookings.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (tableId, timestamp_slot) => {
  try {
    const formattedSlot = toLocalMySQLFormat(timestamp_slot);
    await axios.post("http://localhost:8800/api/service/unbook", {
      table_id: tableId,
      timestamp_slot: formattedSlot
    });
    alert("Booking cancelled.");
    fetchBookings(); // Refresh the list
  } catch {
    setError("Failed to cancel the booking.");
  }
};


  return (
    <div className="profile-container">
      <h2>Your Reservations</h2>
      {error && <p className="error">{error}</p>}

      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-info">
                <h4>Table #{booking.table_id}</h4>
                <p>Date: {new Date(booking.timestamp_slot).toLocaleDateString()}</p>
                <p>Time: {new Date(booking.timestamp_slot).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
              </div>
              <button onClick={() => handleCancel(booking.table_id, booking.timestamp_slot)}>Cancel</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
