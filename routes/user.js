import express from "express";

import {
  getuserValidator,
  updateuserValidator,
  deleteuserValidator,
  createuserValidator,
  changeuserpasswordvalidate,
} from "../utils/validators/userValidator.js";

import {
  getusers,
  createuser,
  getuser,
  updateuser,
  deleteuser,
  changeuserpassword,
  countuser,
} from "../controllers/user.js";
import { allowedTo, protect } from "../controllers/auth.js";

const router = express.Router();

router.put(
  "/changepassword/:id",
  changeuserpasswordvalidate,
  changeuserpassword
);

router
  .route("/")
  .get(protect, allowedTo("admin", "user"), getusers)
  .post(protect, allowedTo("admin"), createuserValidator, createuser);

router.route("/count").get(protect, allowedTo("admin"), countuser);

router
  .route("/:id")
  .get(getuserValidator, getuser)
  .put(protect, allowedTo("admin", "user"), updateuserValidator, updateuser)
  .delete(protect, allowedTo("admin"), deleteuserValidator, deleteuser);

export { router };
