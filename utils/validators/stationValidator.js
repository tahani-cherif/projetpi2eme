import { body, param } from "express-validator";
import mongoose from "mongoose";

export const stationValidationRules = [
  body("name").isString().notEmpty(),
  body("address").isString().notEmpty(),
  body("latitude").isFloat({ min: -90, max: 90 }).notEmpty(),
  body("longitude").isFloat({ min: -180, max: 180 }).notEmpty(),
  body("typeTransport").isMongoId().notEmpty(),
];

export const stationIdValidationRules = [
  param("id").isMongoId(),
];
export const distanceValidationRules = [
  body("latitude").isFloat({ min: -90, max: 90 }).notEmpty(),
  body("longitude").isFloat({ min: -180, max: 180 }).notEmpty(),
];
