import { check } from "express-validator";
import { validationResult } from "express-validator";

export const createActivityValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("schedule").notEmpty().withMessage("Schedule is required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const getActivityValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateActivityValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  check("name").optional().notEmpty().withMessage("Name is required"),
  check("description").optional().notEmpty().withMessage("Description is required"),
  check("address").optional().notEmpty().withMessage("Address is required"),
  check("schedule").optional().notEmpty().withMessage("Schedule is required"),
  check("price").optional().isNumeric().withMessage("Price must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteActivityValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
