import { body, param } from "express-validator";
import mongoose from "mongoose";

export const circuitValidationRules = [
  body("name").isString().notEmpty(),
  body("duree").isNumeric().notEmpty(),
  body("price").isNumeric().notEmpty(),
  body("startDate").isISO8601().toDate().notEmpty(),
  body("endDate").isISO8601().toDate().notEmpty(),
  body("address").isString().notEmpty(),
  body("station").isMongoId().notEmpty(),
  body("loisir").isArray().custom((value) => value.every(item => mongoose.Types.ObjectId.isValid(item))),
];

export const circuitIdValidationRules = [
  param("id").isMongoId(),
];
