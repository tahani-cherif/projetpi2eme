import express from "express";
import {
  createEventValidator,
  getEventValidator,
  updateEventValidator,
  deleteEventValidator,

}
  from "../utils/validators/eventValidator.js";

import {
  getEvent,
  creatEvent,
  updateevent,
  deleteevent,
  getAllEvent,
  upcomingEvent
} from "../controllers/event.js"

const router = express.Router();


router.get("/getAll", getAllEvent);
router.get("/upcoming", upcomingEvent);
router.post("/create", createEventValidator, creatEvent);
router.get("/get/:id", getEventValidator, getEvent)

router.put('/update/:id', updateEventValidator, updateevent)
router.delete('/delete/:id', deleteEventValidator, deleteevent);

export { router };

