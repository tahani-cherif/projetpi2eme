import express from "express";
import {
  getActivityValidator,
  createActivityValidator,
  updateActivityValidator,
  deleteActivityValidator,
} from "../utils/validators/activityValidator.js";

import {
  getActivities,
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} from "../controller/activity.js";

const router = express.Router();

router.route("/").get(getActivities).post(createActivityValidator, createActivity);

router
  .route("/:id")
  .get(getActivityValidator, getActivity)
  .put(updateActivityValidator, updateActivity)
  .delete(deleteActivityValidator, deleteActivity);

export { router };
