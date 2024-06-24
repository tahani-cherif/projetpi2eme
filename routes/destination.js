import express from 'express';
import cloudinary from 'cloudinary';
import multer from "../middlewares/multer-config.js";
import { param } from 'express-validator';
import fileUpload from 'express-fileupload';
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from '../controllers/destination.js';
import destinationValidator from '../utils/validators/destinationValidator.js';
import { allowedTo, protect } from "../controllers/auth.js";

const router = express.Router();


// Route to create a new destination
router.post('/',  destinationValidator, createDestination);
//, allowedTo("admin","user"),multer("imageUrl", 512 * 1024)
// Route to get all destinations
router.get('/',getAllDestinations);

// Route to get a single destination by ID
router.get('/:id',protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format')
], getDestinationById);

// Route to update a destination by ID
router.put('/:id',protect, allowedTo("admin","user"),[
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...destinationValidator
], updateDestination);

// Route to delete a destination by ID
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteDestination);

export default router;
