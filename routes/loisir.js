import express from 'express';
import { param , query } from 'express-validator';
import {
  createLoisir,
  getAllLoisirs,
  getLoisirById,
  updateLoisir,
  deleteLoisir,
  getLoisirsByCategoryAndKitchen,
} from '../controllers/loisir.js';
import loisirValidator from '../utils/validators/loisirValidator.js';
import { allowedTo, protect } from "../controllers/auth.js";
const router = express.Router();

// Route to create a new loisir
router.post('/', protect, allowedTo("admin","user"),loisirValidator, createLoisir);

// Route to get all loisirs
router.get('/',protect, allowedTo("admin","user"),getAllLoisirs);

// Route to get a single loisir by ID
router.get('/:id', protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format')
], getLoisirById);

// Route to update a loisir by ID
router.put('/:id', protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...loisirValidator
], updateLoisir);

// Route to delete a loisir by ID
router.delete('/:id',protect, allowedTo("admin"),[
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteLoisir);

// Route to get loisirs by category "restaurant" and kitchen type
router.get('/category/restaurant', protect, allowedTo("admin","user"), [
  query('kitchen').notEmpty().withMessage('Kitchen type is required')
], getLoisirsByCategoryAndKitchen);

export default router;
