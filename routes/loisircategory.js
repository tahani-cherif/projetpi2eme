import express from 'express';
import { param } from 'express-validator';
import {
  createLoisirCategory,
  getAllLoisirCategories,
  getLoisirCategoryById,
  updateLoisirCategory,
  deleteLoisirCategory,
} from '../controllers/loisircategory.js';
import loisirCategoryValidator from '../utils/validators/loisirCategoryValidator.js';
import { allowedTo, protect } from "../controllers/auth.js";
const router = express.Router();

// Route to create a new loisir category
router.post('/', protect, allowedTo("admin","user"),loisirCategoryValidator, createLoisirCategory);

// Route to get all loisir categories
router.get('/',  protect, allowedTo("admin","user"), getAllLoisirCategories);

// Route to get a single loisir category by ID
router.get('/:id', protect, allowedTo("admin","user"),[
  param('id').isMongoId().withMessage('Invalid ID format')
], getLoisirCategoryById);

// Route to update a loisir category by ID
router.put('/:id', protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...loisirCategoryValidator
], updateLoisirCategory);

// Route to delete a loisir category by ID
router.delete('/:id', protect, allowedTo("admin"), [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteLoisirCategory);

export default router;
