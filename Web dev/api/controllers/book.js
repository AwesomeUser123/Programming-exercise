import { db } from "../connect.js";

export const book = (req,res) =>   {
    const query = "UPDATE `webdev`.`reservations` SET `username` = ?, `status` = 'non-available' WHERE (`table_id` = ? AND timestamp_slot = ? AND status = 'available');";
    db.query(query,[req.body.username,req.body.table_id,req.body.timestamp_slot],(err,data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json("Booked successfully");    
    })
}

export const unbook = (req,res) => {
    const query = "UPDATE `webdev`.`reservations` SET `username` = NULL, `status` = 'available' WHERE (`table_id` = ? AND timestamp_slot = ?);"
    db.query(query,[req.body.table_id, req.body.timestamp_slot],(err,data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json("Unbooked successfully");    
    })
}

export const getBookInfo = (req,res) => {
    const query = "SELECT * FROM reservations where `username` = ?";
    db.query(query,[req.query.username],(err,data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}