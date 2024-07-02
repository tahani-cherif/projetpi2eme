import express from "express";
import {
  createTypeTransport,
  getAllTypeTransports,
  getTypeTransportById,
  updateTypeTransport,
  deleteTypeTransport,
} from "../controllers/typeTransportController.js";
import { typeTransportValidationRules, typeTransportIdValidationRules } from "../utils/validators/typeTransportValidator.js";
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
router.post("/", typeTransportValidationRules, validate, createTypeTransport);
router.get("/", getAllTypeTransports);
router.get("/:id", typeTransportIdValidationRules, validate, getTypeTransportById);
router.put("/:id", [...typeTransportIdValidationRules, ...typeTransportValidationRules], validate, updateTypeTransport);
router.delete("/:id", typeTransportIdValidationRules, validate, deleteTypeTransport);

export default router;
