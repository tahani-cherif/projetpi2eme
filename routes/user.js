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
  .get(protect, allowedTo("admin"), getusers)
  .post(createuserValidator, createuser);

router
  .route("/:id")
  .get(getuserValidator, getuser)
  .put(updateuserValidator, updateuser)
  .delete(deleteuserValidator, deleteuser);

export { router };
