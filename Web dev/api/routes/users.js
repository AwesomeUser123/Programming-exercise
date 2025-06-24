import express from "express";
import { getMe } from "../controllers/users.js";

const router = express.Router();

router.get("/me", getMe, (req, res) => {
  res.status(200).json({ id: req.userId });
});

export default router;
