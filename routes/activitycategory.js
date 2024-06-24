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
router.post('/', activityCategoryValidator, createActivityCategory);

// Route to get all loisir categories
router.get('/', getAllActivityCategories);

// Route to get a single loisir category by ID
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], getActivityCategoryById);

// Route to update a loisir category by ID
router.put('/:id',  [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...activityCategoryValidator
], updateActivityCategory);

// Route to delete a loisir category by ID
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteActivityCategory);

export default router;
