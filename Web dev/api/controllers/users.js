// routes/users.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware inside this file
export const getMe = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("Access denied, no token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json("Invalid token");
  }
};



export default router;
