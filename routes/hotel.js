
import express from "express";
import {
  getHotelValidator,
  createHotelValidator,
  updateHotelValidator,
  deleteHotelValidator,
} from "../utils/validators/hotelValidator.js";

import {
  getHotels,
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
} from "../controller/hotel.js";

const router = express.Router();

router.route("/").get(getHotels).post(createHotelValidator, createHotel);

router
  .route("/:id")
  .get(getHotelValidator, getHotel)
  .put(updateHotelValidator, updateHotel)
  .delete(deleteHotelValidator, deleteHotel);

export { router };
