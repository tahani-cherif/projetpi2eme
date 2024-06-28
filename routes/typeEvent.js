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

router.get('/getAll', gettypevent);
router.post('/create', creattypeventValidator, creattypevent);
router.get('/get/:id', gettypeventbyid);
router.put('/update/:id', updatetypeventValidator, updatetypevent);
router.delete('/delete/:id', deletetypevent);

export { router };

