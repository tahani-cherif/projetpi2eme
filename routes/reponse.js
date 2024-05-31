import express from "express";
import { body } from "express-validator";

import { allowedTo, protect } from "../controllers/auth.js";
import { getAll, addOnce, getOnce, putOnce,deleteOnce} from "../controllers/reponse.js";
import { idValidationRules, reponseValidationRules } from "../utils/validators/reponseValidator.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(protect, allowedTo("admin"), 
   
    body("message").isLength({ min: 5 }),
   
    body ("status"),
    addOnce
  );

router
  .route("/:_id")
  .get(protect, allowedTo("admin"),getOnce)
  .put(protect, allowedTo("admin"), 
  
    body("message").isLength({ min: 5 }),

    body ("status"),
    putOnce
  )
  .delete(protect, allowedTo("admin"), 
    idValidationRules(),
    deleteOnce)

  ;

export default router;
