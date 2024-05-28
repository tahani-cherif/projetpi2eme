import express from "express";
import { body } from "express-validator";

import {
  getAll,
  addOnce,
  getOnce,
  putOnce,
} from "../controllers/reclamation.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    body("message").isLength({ min: 5 }),
    body("email"),
    body("type"),
    addOnce
  );

router
  .route("/:_id")
  .get(getOnce)
  .put(
    body("message").isLength({ min: 5 }),
    body("email"),
    body("type"),
    putOnce
  );

export default router;
