import express from "express";
import { body } from "express-validator";

import { allowedTo, protect } from "../controllers/auth.js";
import {
  getAll,
  addOnce,
  getOnce,
  putOnce,
  deleteOnce,
} from "../controllers/reponse.js";
import {
  idValidationRules,
  reponseValidationRules,
} from "../utils/validators/reponseValidator.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    protect,
    allowedTo("admin", "user"),

    body("message").isLength({ min: 5 }),
    body("reclamationId"),

    addOnce
  );

router
  .route("/:_id")
  .get(protect, allowedTo("admin", "user"), getOnce)
  .put(
    protect,
    allowedTo("admin", "user"),
    body("message").isLength({ min: 5 }),
    body("type"),
    body("status"),
    body("idReclamation"),
    putOnce
  )
  .delete(protect, allowedTo("admin", "user"), idValidationRules(), deleteOnce);

export default router;
