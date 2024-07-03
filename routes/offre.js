import express from "express";
import { body } from "express-validator";

import { getAll, addOnce, getOnce, deleteOnce, countoffre,updateOffre } from "../controllers/offre.js";
import { allowedTo, protect } from "../controllers/auth.js";

const router = express.Router();

router
    .route("/")
    .post(
        body("name").isLength({ min: 3, max: 30 }),
        body("dated"),
        body("datef"),
        body("price"),
        addOnce
    )
    .get( getAll);

router.route("/countoffre").get(countoffre);
router.route("/:offre").get( getOnce).delete( deleteOnce);

router.route('/:id').put(protect, allowedTo("admin", "user"), updateOffre);
export { router };
