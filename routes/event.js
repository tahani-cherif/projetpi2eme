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
  getAllEvent
} from "../controllers/event.js"

const router = express.Router();

router.route("/")
  .get(getAllEvent)
  .post(createEventValidator, creatEvent);

router.route("/:id")
  .get(getEventValidator, getEvent)
  .put(updateEventValidator, updateevent)
  .delete(deleteEventValidator, deleteevent);

export { router };

