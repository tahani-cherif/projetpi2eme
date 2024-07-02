import express from "express";
import { body } from "express-validator";

import { getAll, addOnce, getOnce, deleteOnce } from "../controllers/category-offre.js";
import { allowedTo, protect } from "../controllers/auth.js";

const router = express.Router();

router
    .route("/")
    .post(protect, allowedTo("admin"),
        body("type").isLength({ min: 3, max: 30 }),

        addOnce
    )
    .get(getAll);


router.route("/:categorie").get(protect, allowedTo("admin", "user"),getOnce).delete(deleteOnce);





export { router };
