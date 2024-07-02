import express from 'express';
import { param , query } from 'express-validator';
import {
  createActivity,
  getAllActivitys,
  getActivityById,
  updateActivity,
  deleteActivity,
  getActivitysByCategoryAndKitchen,
} from '../controllers/activity.js';
import activityValidator from '../utils/validators/activityValidator.js';
import { allowedTo, protect } from "../controllers/auth.js";
const router = express.Router();

// Route to create a new loisir
router.post('/', protect, allowedTo("admin","user"),activityValidator, createActivity);

// Route to get all loisirs
router.get('/',getAllActivitys);

// Route to get a single loisir by ID
router.get('/:id', protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format')
], getActivityById);

// Route to update a loisir by ID
router.put('/:id', protect, allowedTo("admin","user"), [
  param('id').isMongoId().withMessage('Invalid ID format'),
  ...activityValidator
], updateActivity);

// Route to delete a loisir by ID
router.delete('/:id',protect, allowedTo("admin"),[
  param('id').isMongoId().withMessage('Invalid ID format')
], deleteActivity);

// Route to get loisirs by category "restaurant" and kitchen type
router.get('/category/restaurant', protect, allowedTo("admin","user"), [
  query('kitchen').notEmpty().withMessage('Kitchen type is required')
], getActivitysByCategoryAndKitchen);

export default router;
