import { check } from "express-validator";
import { validationResult } from "express-validator";

export const creattypeventValidator = [
  check("Name").notEmpty().withMessage("Name is required"),
  
];

export const gettypeventValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export const updatetypeventValidator = [
  
  check("Name").optional().notEmpty().withMessage("Name is required"),];

export const deletetypeventValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
