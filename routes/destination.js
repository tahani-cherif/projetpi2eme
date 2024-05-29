import express from 'express';
import { param } from 'express-validator';
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from '../controllers/destination.js';
import destinationValidator from '../utils/validators/destinationValidator.js';

const router = express.Router();

// Route to create a new destination
router.post('/', destinationValidator, createDestination);

// Route to get all destinations
router.get('/', getAllDestinations);

// Route to get a single destination by ID
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], getDestinationById);

// Route to update a destination by ID
router.put('/:id',, [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...destinationValidator
], updateDestination);

// Route to delete a destination by ID
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteDestination);

export default router;
