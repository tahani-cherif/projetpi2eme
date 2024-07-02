import express from "express";
import { body } from "express-validator";

import { getAll, addOnce, getOnce, deleteOnce, countoffre } from "../controllers/offre.js";
import { allowedTo, protect } from "../controllers/auth.js";

const router = express.Router();

router
    .route("/")
    .post(protect, allowedTo("admin"),
        body("name").isLength({ min: 3, max: 30 }),
        body("Dtedebut"),
        body("Dtefin"),
        body("price"),
        addOnce
    )
    .get(protect, allowedTo("admin", "user"),getAll);

router.route("/countoffre").get(protect, allowedTo("admin", "user"), countoffre);
router.route("/:offre").get(protect, allowedTo("admin", "user"),getOnce).delete(protect, allowedTo("admin"),deleteOnce);


export { router };
