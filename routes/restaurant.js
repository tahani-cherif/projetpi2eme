import express from "express";
import {
  getRestaurantValidator,
  createRestaurantValidator,
  updateRestaurantValidator,
  deleteRestaurantValidator,
} from "../utils/validators/restaurantValidator.js";

import {
  getRestaurants,
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controller/restaurant.js";

const router = express.Router();

router.route("/").get(getRestaurants).post(createRestaurantValidator, createRestaurant);

router
  .route("/:id")
  .get(getRestaurantValidator, getRestaurant)
  .put(updateRestaurantValidator, updateRestaurant)
  .delete(deleteRestaurantValidator, deleteRestaurant);

export { router };
