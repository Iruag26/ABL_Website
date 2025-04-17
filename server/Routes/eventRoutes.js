import express from "express";
import { addEvent2, addEvent, uploadMiddleware, fetchEvents, fetchEvents2, fetchEventById} from "../controller/eventController.js";

const router = express.Router();

router.post("/events", uploadMiddleware, addEvent);
router.post("/events2", addEvent2);
router.get("/events", fetchEvents);
router.get("/events22", fetchEvents2);
router.get("/events/:e_id", fetchEventById);


export default router;
