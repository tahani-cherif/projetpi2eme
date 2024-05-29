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

const router = express.Router();

// Route to create a new loisir category
router.post('/loisir-categories', loisirCategoryValidator, createLoisirCategory);

// Route to get all loisir categories
router.get('/loisir-categories', getAllLoisirCategories);

// Route to get a single loisir category by ID
router.get('/loisir-categories/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], getLoisirCategoryById);

// Route to update a loisir category by ID
router.put('/loisir-categories/:id', [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...loisirCategoryValidator
], updateLoisirCategory);

// Route to delete a loisir category by ID
router.delete('/loisir-categories/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteLoisirCategory);

export default router;
