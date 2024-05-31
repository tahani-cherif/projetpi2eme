import express from "express";
import { body } from "express-validator";


import { getAll, addOnce, getOnce, putOnce,deleteOnce } from "../controllers/reclamation.js";
/*import { idValidationRules, reclamationValidationRules } from "../utils/validators/reclamationValidator.js";*/
import { idValidationRules, reclamationValidationRules } from "../utils/validators/reclamationValidator.js";


const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
   
    reclamationValidationRules(),
    addOnce
  );

router
  .route("/:_id")
  .get(idValidationRules(),getOnce)
  .put(
  
    reclamationValidationRules(),
    putOnce
  )
  .delete(
    idValidationRules(),
    deleteOnce)

  ;

export default router;
