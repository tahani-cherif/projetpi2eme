import express from "express";
import { body } from "express-validator";

import { getAll, addOnce, getOnce, deleteOnce, countoffre } from "../controllers/offre.js";

const router = express.Router();

router
    .route("/")
    .post(
        body("name").isLength({ min: 3, max: 30 }),
        body("Dtedebut"),
        body("Dtefin"),
        body("price"),
        addOnce
    )
    .get(getAll);

router.route("/countoffre").get(countoffre);
router.route("/:offre").get(getOnce).delete(deleteOnce);


export { router };
