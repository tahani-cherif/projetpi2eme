import express from "express";
import { body } from "express-validator";


import { getAll, addOnce, getOnce, putOnce,deleteOnce} from "../controllers/reponse.js";
import { idValidationRules, reclamationValidationRules } from "../utils/validators/reclamationValidator.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
   
    body("message").isLength({ min: 5 }),
   
    body ("status"),
    addOnce
  );

router
  .route("/:_id")
  .get(getOnce)
  .put(
  
    body("message").isLength({ min: 5 }),

    body ("status"),
    putOnce
  )
  .delete(
    idValidationRules(),
    deleteOnce)

  ;

export default router;
