import { db } from "../connect.js";

//http://localhost:8800/api/event/insertEvent
export const insertEvent = (req,res) => {
     const query = `
        INSERT INTO event (name, \`date of occurence\`, \`date of ending\`, \`image link\`, description)
        VALUES (?, ?, ?, ?,?)
    `;
    db.query(query, [req.body.name, req.body.dateStart, req.body.dateEnd, req.body.imageLink, req.body.description], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("event created");
    });
}
//http://localhost:8800/api/event/viewEvent
export const viewEvent = (req,res) => {
    const query = `
        SELECT * FROM event
    `
    db.query(query,[],(err,data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}
//http://localhost:8800/api/event/modifyEvent
export const modifyEvent = (req,res) => {
    const query = `
        UPDATE event
        SET name = ?, \`date of occurence\` = ?, \`date of ending\` = ?, \`image link\` = ?, description = ?
        WHERE name = ?
    `;

    db.query(query, [req.body.name, req.body.dateStart, req.body.dateEnd, req.body.imageLink, req.body.description, req.body.oldName], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("event modified");
    });
}
//http://localhost:8800/api/event/deleteEvent
export const deleteEvent = (req,res) => {
    const query = `
    DELETE FROM event WHERE name = ?; 
    `
    db.query(query, [req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("event deleted");
    });
}