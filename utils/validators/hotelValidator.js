import { check } from "express-validator";
import { validationResult } from "express-validator";

export const createHotelValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("stars").isNumeric().withMessage("Stars must be a number"),
  check("pricePerNight").isNumeric().withMessage("Price per night must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const getHotelValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateHotelValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  check("name").optional().notEmpty().withMessage("Name is required"),
  check("description").optional().notEmpty().withMessage("Description is required"),
  check("address").optional().notEmpty().withMessage("Address is required"),
  check("stars").optional().isNumeric().withMessage("Stars must be a number"),
  check("pricePerNight").optional().isNumeric().withMessage("Price per night must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteHotelValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
