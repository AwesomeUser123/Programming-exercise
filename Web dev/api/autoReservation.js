// autoReservation.js
import db from "./connect.js"; // use your DB connection setup

const TIME_SLOTS = [
  { time: '08:00:00', label: '8-11' },
  { time: '12:00:00', label: '12-15' },
  { time: '16:00:00', label: '16-19' },
  { time: '19:30:00', label: '19:30-22:30' },
];

async function ensureFutureReservations() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 3); // Keep next 3 days

  // Get current max timestamp_slot
  const [result] = await db.promise().query(
    `SELECT MAX(DATE(timestamp_slot)) AS max_day FROM reservations`
  );
  const currentMax = new Date(result[0].max_day);
  currentMax.setHours(0, 0, 0, 0);

  //get table list
  const [tables] = await db.promise().query(`SELECT id FROM tables WHERE is_active = TRUE`);

  // Insert only missing days
  for (
    let date = new Date(currentMax.getTime() + 86400000); // next day
    date <= maxDate;
    date.setDate(date.getDate() + 1) ) 
    {
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        for (let table of tables) {
            for (let slot of TIME_SLOTS) {
                await db.promise().query(
                `INSERT INTO reservations (table_id, timestamp_slot, time_range_label, username, status)
                VALUES (?, ?, ?, NULL, 'available')`,
                [table.id, `${dateStr} ${slot.time}`, slot.label]
                );
            }
        }
    }

  console.log("Reservation slots updated!");
}

ensureFutureReservations().catch(err => console.error(err));
