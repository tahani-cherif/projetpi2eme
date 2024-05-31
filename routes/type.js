import express from "express";

import { getAll, addOnce, getOnce, putOnce ,deleteOnce} from "../controllers/type.js"; 
import { idValidationRules, typeValidationRules } from "../utils/validators/typeValidator.js";



const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    typeValidationRules(),
    addOnce
  );

router
  .route("/:_id")
  .get(getOnce)
  .put(
    typeValidationRules(),
    putOnce
  )
  .delete(
    idValidationRules(),
    deleteOnce)
;

export default router;
