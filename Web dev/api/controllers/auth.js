import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `password`) VALUES (?, ?)";
        db.query(q, [req.body.username, hashedPassword], (err, data) => {
            if (err) return res.status(520).json(err);
            return res.status(200).json("User has been created");
        });
    });
};


export const login = (req,res)  =>{
    const q = "select * from users where username =?"
    db.query(q,[req.body.username],(err,data)=>{
        if (err) return res.status(500).json(err);
        if (data.length == 0) return res.status(404).json("User not found")
        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password) 
        if (!checkPassword) return res.status(400).json("Wrong password or username!")  
        
        const token = jwt.sign({id: data[0].id }, "secretkey");
        
        const {password, ...others} = data[0]
         
        res.status(200).json({
        token,         // include JWT here
        user: others   // include user data separately
        });
    });
}

export const logout = (req,res) =>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out")
}