import express from "express";
import {
  getRegionValidator,
  createRegionValidator,
  updateRegionValidator,
  deleteRegionValidator,
} from "../utils/validators/regionValidator.js";

import {
  getRegions,
  createRegion,
  getRegion,
  updateRegion,
  deleteRegion,
} from "../controller/region.js";

const router = express.Router();

router.route("/").get(getRegions).post(createRegionValidator, createRegion);

router
  .route("/:id")
  .get(getRegionValidator, getRegion)
  .put(updateRegionValidator, updateRegion)
  .delete(deleteRegionValidator, deleteRegion);

export { router };
