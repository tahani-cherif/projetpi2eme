import { check, validationResult } from "express-validator";

export const creatreservationValidator = [
  check("Name").notEmpty().withMessage("Name is required"),
  
];

export const getreservationValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export const updatereservationValidator = [
  
  check("Name").optional().notEmpty().withMessage("Name is required"),];

export const deletereservationValidator = [
  check ("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
