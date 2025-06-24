import express from "express";
import { reserveCheck } from "../controllers/available.js";

const router = express.Router()

router.get("/available",reserveCheck)
//router.get("",)
export default router