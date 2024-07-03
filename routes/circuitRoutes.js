import express from "express";
import {
  circuitValidationRules,
  circuitIdValidationRules,
} from "../utils/validators/circuitValidator.js";
import { validationResult } from "express-validator";
import {
  getAllCircuits,
  createCircuit,
  getCircuitById,
  updateCircuit,
  deleteCircuit,
} from "../controllers/circuitController.js";
import upload from "../middlewares/multerConfig.js";

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
router.post("/", upload.array('images', 10), circuitValidationRules, validate, createCircuit); // Use the middleware
router.get("/", getAllCircuits);
router.get("/:id", circuitIdValidationRules, validate, getCircuitById);
router.put("/:id",  upload.array('images', 10), [...circuitIdValidationRules, ...circuitValidationRules], validate, updateCircuit); // Use the middleware

router.delete("/:id", circuitIdValidationRules, validate, deleteCircuit);

export default router;
