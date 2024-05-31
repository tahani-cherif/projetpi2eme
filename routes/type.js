import express from "express";
import { allowedTo, protect } from "../controllers/auth.js";
import { getAll, addOnce, getOnce, putOnce ,deleteOnce} from "../controllers/type.js"; 
import { idValidationRules, typeValidationRules } from "../utils/validators/typeValidator.js";



const router = express.Router();

router
  .route("/")
  .get(protect, allowedTo("admin","user"), getAll)
  .post(protect, allowedTo("admin","user"), 
    typeValidationRules(),
    addOnce
  );

router
  .route("/:_id")
  .get(protect, allowedTo("admin","user"), getOnce)
  .put(protect, allowedTo("admin","user"), 
    typeValidationRules(),
    putOnce
  )
  .delete(protect, allowedTo("admin","user"), 
    idValidationRules(),
    deleteOnce)
;

export default router;
