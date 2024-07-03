import express from "express";
import { body } from "express-validator";
import { allowedTo, protect } from "../controllers/auth.js";

import { getAll, addOnce, getOnce, putOnce,deleteOnce,generatePdf } from "../controllers/reclamation.js";
/*import { idValidationRules, reclamationValidationRules } from "../utils/validators/reclamationValidator.js";*/
import { idValidationRules, reclamationValidationRules } from "../utils/validators/reclamationValidator.js";


const router = express.Router();

router.route("/generate-pdf/:id").get(generatePdf);

router
  .route("/")
  .get(protect, allowedTo("admin", "user"), getAll)
  .post(protect, allowedTo("admin", "user"), 
   
    reclamationValidationRules(),
    addOnce
  );


router
  .route("/:id")
  .get(protect, allowedTo("admin", "user"), idValidationRules(),getOnce)
  .put(protect, allowedTo("admin", "user"), 
  
    reclamationValidationRules(),
    putOnce
  )
  .delete(protect, allowedTo("admin", "user"), 
    idValidationRules(),
    deleteOnce)

  ;

export default router;
