import express from "express";
import {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
  getStationsByDistance,
} from "../controllers/stationController.js";
import {
  stationValidationRules,
  stationIdValidationRules,
  distanceValidationRules,
} from "../utils/validators/stationValidator.js";
import { validationResult } from "express-validator";

const router = express.Router();

// Middleware for validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post("/", stationValidationRules, validate, createStation);
router.get("/", getAllStations);
router.get("/:id", stationIdValidationRules, validate, getStationById);
router.put(
  "/:id",
  [...stationIdValidationRules, ...stationValidationRules],
  validate,
  updateStation
);
router.delete("/:id", stationIdValidationRules, validate, deleteStation);
router.post(
  "/distance",
  distanceValidationRules,
  validate,
  getStationsByDistance
);

export default router;
