import { db } from "../connect.js"
export const foodget = (req,res) => {
    const query = "SELECT * FROM foodinfo"
    db.query(query,[],(err,data) =>{
        if (err) return res.status(500).json(err);
        if (data.length)  return res.json(data);
    })
}