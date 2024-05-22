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
} from "../controller/user.js";

const router = express.Router();

router.put(
  "/changepassword/:id",
  changeuserpasswordvalidate,
  changeuserpassword
);

router.route("/").get(getusers).post(createuserValidator, createuser);

router
  .route("/:id")
  .get(getuserValidator, getuser)
  .put(updateuserValidator, updateuser)
  .delete(deleteuserValidator, deleteuser);

export { router };
