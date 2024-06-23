import ActivityCategory from '../models/activitycategory.js';
import { validationResult } from 'express-validator';
import Activity from '../models/activity.js';

// Create a new loisir category
export const createActivityCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const activityCategory = new ActivityCategory(req.body);
    await activityCategory.save();
    res.status(201).json(activityCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all loisir categories
export const getAllActivityCategories = async (req, res) => {
  try {
    const activityCategories = await ActivityCategory.find();
    res.status(200).json(activityCategories);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single loisir category by ID
export const getActivityCategoryById = async (req, res) => {
  try {
    const activityCategory = await ActivityCategory.findById(req.params.id);
    if (!activityCategory) {
      return res.status(404).json({ error: 'Activity category not found' });
    }
    res.status(200).json(activityCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a loisir category by ID
export const updateActivityCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const activityCategory = await ActivityCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!activityCategory) {
      return res.status(404).json({ error: 'Activity category not found' });
    }
    res.status(200).json(activityCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a loisir category by ID
export const deleteActivityCategory = async (req, res) => {
  try {
    const activities = await Activity.deleteMany({ category: req.params.id });
    const activityCategory = await ActivityCategory.findByIdAndDelete(req.params.id);
    if (!activityCategory) {
      return res.status(404).json({ error: 'Activity category not found' });
    }
    res.status(200).json({ message: 'Activity category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
