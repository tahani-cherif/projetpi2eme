import express from "express";
import {


} 
from "../utils/validators/reservationValidator.js";

import {
  getreservation,
  creatreservation,
  updatereservation,
  deletereservation,
  getreservationbyid,
 
} from "../controllers/reservation.js"

const router = express.Router();

router.route("/")
  .get(getreservation)
  .post(creatreservation, getreservation, creatreservation);

router.route("/:id")
  .get(getreservationbyid)
  .put( updatereservation, updatereservation)
  .delete( deletereservation, updatereservation);

  export { router };