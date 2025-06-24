import express from "express";
import { deleteEvent, insertEvent, modifyEvent, viewEvent } from "../controllers/event.js";
const router = express.Router()
router.get("/viewEvent",viewEvent)
router.post("/insertEvent",insertEvent)
router.post("/modifyEvent",modifyEvent)
router.post("/deleteEvent",deleteEvent)
export default router