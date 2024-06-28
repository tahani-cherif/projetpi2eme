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


router.post("/create",creatreservation);
router.get("/getByEvent/:id",getreservation);
router.delete("/delete/:id",deletereservation);

  export { router };