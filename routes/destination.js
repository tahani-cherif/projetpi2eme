import express from "express";
import {
  createDestinationValidator,
  getDestinationValidator,
  updateDestinationValidator,
  deleteDestinationValidator,
} from "../utils/validators/destinationValidator.js";

import {
  getDestinations,
  createDestination,
  getDestination,
  updateDestination,
  deleteDestination,
} from "../controller/destination.js";

const router = express.Router();

router.route("/")
  .get(getDestinations)
  .post(createDestinationValidator, createDestination);

router.route("/:id")
  .get(getDestinationValidator, getDestination)
  .put(updateDestinationValidator, updateDestination)
  .delete(deleteDestinationValidator, deleteDestination);

export { router };
