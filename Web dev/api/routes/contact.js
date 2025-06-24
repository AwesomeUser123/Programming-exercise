import express from "express";
import { AdminInsertMessage, getChatHistory, GetUsername, insertMessage, Notify, UpdateCheck } from "../controllers/contact.js";

const router = express.Router()

router.get("/chatHistory",getChatHistory)
router.post("/insertMessage",insertMessage)
router.get("/users",GetUsername)
router.post("/Admin_insertMessage",AdminInsertMessage)
router.get("/notify",Notify)
router.post("/userCheck",UpdateCheck)
//router.get("",)
export default router