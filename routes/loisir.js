import express from 'express';
import { param } from 'express-validator';
import {
  createLoisir,
  getAllLoisirs,
  getLoisirById,
  updateLoisir,
  deleteLoisir,
} from '../controllers/loisir.js';
import loisirValidator from '../utils/validators/loisirValidator.js';

const router = express.Router();

// Route to create a new loisir
router.post('/loisirs', loisirValidator, createLoisir);

// Route to get all loisirs
router.get('/loisirs', getAllLoisirs);

// Route to get a single loisir by ID
router.get('/loisirs/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], getLoisirById);

// Route to update a loisir by ID
router.put('/loisirs/:id', [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...loisirValidator
], updateLoisir);

// Route to delete a loisir by ID
router.delete('/loisirs/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteLoisir);

export default router;
