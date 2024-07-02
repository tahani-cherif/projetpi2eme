import Activity from '../models/activity.js';
import { validationResult } from 'express-validator';

// Create a new loisir
export const createActivity = async (req, res) => {

  try {
    const activity =await Activity.create(req.body)
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all loisirs
export const getAllActivitys = async (req, res) => {
  try {
    const activitys = await Activity.find().populate('category').populate('destination');
    res.status(200).json(activitys);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single loisir by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('category');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a loisir by ID
export const updateActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a loisir by ID
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get loisirs by category "restaurant" and kitchen type
export const getActivitysByCategoryAndKitchen = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { kitchen } = req.query;

  try {
    const activitys = await Activity.find({
      kitchen: kitchen,
     // category: await Category.findOne({ name: "restaurant" })._id
    }).populate('category');
    res.status(200).json(activitys);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
