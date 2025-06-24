import { db } from "../connect.js";
export const getChatHistory = (req, res) => {
  const query = "SELECT * FROM chat WHERE username = ? ORDER BY `date created` ASC";
  db.query(query, [req.query.username], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const insertMessage = (req,res) => {
     const query = `
        INSERT INTO chat (username, \`date created\`, message, ownership, \`admin checked\`)
        VALUES (?, NOW(), ?, 'user','no')
    `;
    db.query(query, [req.body.username, req.body.message], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("message sent");
    });
}

export const AdminInsertMessage = (req, res) => {
    const query = `
        INSERT INTO chat (username, \`date created\`, message, ownership, \`admin checked\`)
        VALUES (?, NOW(), ?, 'admin','yes')
    `;
    db.query(query, [req.body.username, req.body.message], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("message sent");
    });
};


export const GetUsername = (req,res) => {
  const query = "SELECT username from users"
  db.query(query,[],(err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const Notify = (req,res) => {
  const query = "SELECT distinct username from chat where `admin checked` = 'no'"
  db.query(query,[],(err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const UpdateCheck = (req,res) =>{
    const query = "UPDATE chat SET `admin checked` = 'yes' where username = ? ";
    db.query(query, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("user checked");
    });
}