import express from "express";
import {foodget} from "../controllers/foodget.js"

const router = express.Router()

router.get("/getInfo",foodget)
//router.get("",)
export default router