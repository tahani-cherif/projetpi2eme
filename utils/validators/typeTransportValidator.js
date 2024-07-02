import { body, param } from "express-validator";
import mongoose from "mongoose";

export const typeTransportValidationRules = [
  body("name").isString().notEmpty(),
];

export const typeTransportIdValidationRules = [
  param("id").isMongoId(),
];
