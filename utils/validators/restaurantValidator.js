import { check } from "express-validator";
import { validationResult } from "express-validator";

export const createRestaurantValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("kitchen").notEmpty().withMessage("Kitchen type is required"),
  check("averagePrice").isNumeric().withMessage("Average price must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const getRestaurantValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const updateRestaurantValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  check("name").optional().notEmpty().withMessage("Name is required"),
  check("address").optional().notEmpty().withMessage("Address is required"),
  check("description").optional().notEmpty().withMessage("Description is required"),
  check("kitchen").optional().notEmpty().withMessage("Kitchen type is required"),
  check("averagePrice").optional().isNumeric().withMessage("Average price must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteRestaurantValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
