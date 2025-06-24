import { db } from "../connect.js"
export const reserveCheck = (req, res) => {
    const q = "SELECT table_id,timestamp_slot,id,time_range_label,status FROM webdev.reservations WHERE status =  'available' ;";
    db.query(q,[], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
    });
}
