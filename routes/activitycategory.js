import express from 'express';
import { param } from 'express-validator';
import {
  createActivityCategory,
  getAllActivityCategories,
  getActivityCategoryById,
  updateActivityCategory,
  deleteActivityCategory,
} from '../controllers/activitycategory.js';
import activityCategoryValidator from '../utils/validators/activitycategoryValidator.js';
import { allowedTo, protect } from "../controllers/auth.js";
const router = express.Router();

// Route to create a new loisir category
router.post('/', protect, allowedTo("admin","user"),activityCategoryValidator, createActivityCategory);
//, protect, allowedTo("admin","user")
// Route to get all loisir categories
router.get('/', protect, allowedTo("admin","user"),  getAllActivityCategories);

// Route to get a single loisir category by ID
router.get('/:id', protect, allowedTo("admin","user"),  [
  param('id').isMongoId().withMessage('Invalid ID format')
], getActivityCategoryById);

// Route to update a loisir category by ID
router.put('/:id', protect, allowedTo("admin","user"),[
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...activityCategoryValidator
], updateActivityCategory);

// Route to delete a loisir category by ID
router.delete('/:id', protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteActivityCategory);

export default router;
