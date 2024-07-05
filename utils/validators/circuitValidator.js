import { body, param } from "express-validator";
import mongoose from "mongoose";

// Validation rules for creating and updating circuits
export const circuitValidationRules = [
  body("name").isString().notEmpty().withMessage("Name is required and should be a string"),
  body("duree").isNumeric().notEmpty().withMessage("Duree is required and should be a number"),
  body("price").isNumeric().notEmpty().withMessage("Price is required and should be a number"),
  body("startDate").isISO8601().toDate().notEmpty().withMessage("Start date is required and should be a valid date"),
  body("endDate").isISO8601().toDate().notEmpty().withMessage("End date is required and should be a valid date"),
  body("address").isString().notEmpty().withMessage("Address is required and should be a string"),
  body("station").isMongoId().notEmpty().withMessage("Station ID is required and should be a valid MongoDB ID"),

];

// Validation rule for circuit ID
export const circuitIdValidationRules = [
  param("id").isMongoId().withMessage("Circuit ID should be a valid MongoDB ID"),
];
