import express from "express";
import { param, query } from "express-validator";
import cloudinary from 'cloudinary';
import multer from "../middlewares/multer-config.js";
import fileUpload from 'express-fileupload';
import {
  createActivity,
  getAllActivitys,
  getActivityById,
  updateActivity,
  deleteActivity,
  getActivitysByCategoryAndKitchen,
  getActivitysByDestination,
  getFilterActivitys,
} from "../controllers/activity.js";
import activityValidator from "../utils/validators/activityValidator.js";
import { allowedTo, protect } from "../controllers/auth.js";
const router = express.Router();

// Route to create a new loisir
router.post(
  "/",
  protect,
  allowedTo("admin", "user"),
  activityValidator,
  createActivity
);
router.post('/',protect, allowedTo("admin","user"),multer("imageUrl", 512 * 1024), activityValidator, createActivity);

// Route to get all loisirs
router.get("/", protect, allowedTo("admin", "user"), getAllActivitys);

// Route to get a single loisir by ID
router.get(
  "/:id",
  protect,
  allowedTo("admin", "user"),
  [param("id").isMongoId().withMessage("Invalid ID format")],
  getActivityById
);
router.get(
  "/byDestination/:destinationId",
  protect,
  allowedTo("admin", "user"),
  getActivitysByDestination
);
// Route to delete a loisir by ID
router.get(
  "/byCategory/:category/:destination",
  protect,
  allowedTo("admin", "user"),
  [param("category").isMongoId().withMessage("Invalid ID format")],
  getFilterActivitys
);

// Route to update a loisir by ID
router.put(
  "/:id",
  protect,
  allowedTo("admin", "user"),
  [
    param("id").isMongoId().withMessage("Invalid ID format"),
    ...activityValidator,
  ],
  updateActivity
);

// Route to delete a loisir by ID
router.delete(
  "/:id",
  protect,
  allowedTo("admin", "user"),
  [param("id").isMongoId().withMessage("Invalid ID format")],
  deleteActivity
);

// Route to get loisirs by category "restaurant" and kitchen type
router.get(
  "/category/Restaurant",
  protect,
  allowedTo("admin", "user"),
  [query("kitchen").notEmpty().withMessage("Kitchen type is required")],
  getActivitysByCategoryAndKitchen
);

export default router;
