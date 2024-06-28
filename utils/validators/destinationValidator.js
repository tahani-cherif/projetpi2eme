import { check } from "express-validator";
import { validationResult } from "express-validator";

export const createDestinationValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").optional().isString().withMessage("Description must be a string"),
  check("region").isArray().withMessage("Region must be an array of ObjectIds"),
  check("region.*").isMongoId().withMessage("Each region ID must be valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const getDestinationValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateDestinationValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  check("name").optional().notEmpty().withMessage("Name is required"),
  check("description").optional().isString().withMessage("Description must be a string"),
  check("region").optional().isArray().withMessage("Region must be an array of ObjectIds"),
  check("region.*").optional().isMongoId().withMessage("Each region ID must be valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteDestinationValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
