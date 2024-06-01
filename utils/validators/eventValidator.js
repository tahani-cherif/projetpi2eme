import { check } from "express-validator";
import { validationResult } from "express-validator";

export const createEventValidator = [
  check("Name").notEmpty().withMessage("Name is required"),
  check("description").optional().isString().withMessage("Description must be a string"),
];

export const getEventValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateEventValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  check("Name").optional().notEmpty().withMessage("Name is required"),
  check("description").optional().isString().withMessage("Description must be a string"),
];

export const deleteEventValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
