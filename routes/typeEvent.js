import express from "express";
import {
creattypeventValidator,
  gettypeventValidator,
  updatetypeventValidator,
  deletetypeventValidator,

} 
from "../utils/validators/typeventValidator.js";

import {
  gettypevent,
  creattypevent,
  updatetypevent,
  deletetypevent,
  gettypeventbyid,
} from "../controllers/typeevent.js"

const router = express.Router();

router.route("/")
  .get(gettypevent)
  .post(creattypeventValidator, creattypevent);

router.route("/:id")
  .get(gettypeventbyid)
  .put(updatetypeventValidator, updatetypevent)
  .delete(deletetypevent);

  export { router };

