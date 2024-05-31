import express from "express";


import { notifmail} from "../controllers/mail.js";

const router = express.Router();


router.route("/").post(
    notifmail);

export default router ;