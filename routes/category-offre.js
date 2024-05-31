import express from "express";
import { body } from "express-validator";

import { getAll, addOnce, getOnce, deleteOnce } from "../controllers/category-offre.js";

const router = express.Router();

router
    .route("/")
    .post(
        body("type").isLength({ min: 3, max: 30 }),

        addOnce
    )
    .get(getAll);


router.route("/:categorie").get(getOnce).delete(deleteOnce);





export { router };
