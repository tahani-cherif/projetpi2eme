import { check } from "express-validator";
import { validationResult } from "express-validator";

export const createRegionValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const getRegionValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateRegionValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  check("name").optional().notEmpty().withMessage("Name is required"),
  check("description").optional().notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteRegionValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
