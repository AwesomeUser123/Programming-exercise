import express from "express";
import { book, getBookInfo, unbook } from "../controllers/book.js"

const router = express.Router()

router.post("/book",book)
router.post("/unbook",unbook)
router.get("/bookInfo",getBookInfo)
export default router