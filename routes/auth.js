import express from "express";
import {
  loginValidator,
  signupValidator,
} from "../utils/validators/authValidator.js";
import { login, signup } from "../controllers/auth.js";

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

export { router };
