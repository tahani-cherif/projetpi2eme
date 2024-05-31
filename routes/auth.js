import express from "express";
import {
  loginValidator,
  signupValidator,
  forgtpasswordvalidator,
  updatepasswordValidator,
} from "../utils/validators/authValidator.js";
import {
  login,
  signup,
  forgetpassword,
  updatepassword,
  approvedaccount,
} from "../controllers/auth.js";
import { allowedTo, protect } from "../controllers/auth.js";

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);
router.route("/forgetpassword").post(forgtpasswordvalidator, forgetpassword);
router.route("/updatepassword").put(updatepasswordValidator, updatepassword);
router.route("/approvedaccount/:token").get(approvedaccount);

export { router };
