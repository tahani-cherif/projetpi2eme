import LoisirCategory from '../models/loisircategory.js';
import { validationResult } from 'express-validator';

// Create a new loisir category
export const createLoisirCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const loisirCategory = new LoisirCategory(req.body);
    await loisirCategory.save();
    res.status(201).json(loisirCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all loisir categories
export const getAllLoisirCategories = async (req, res) => {
  try {
    const loisirCategories = await LoisirCategory.find();
    res.status(200).json(loisirCategories);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single loisir category by ID
export const getLoisirCategoryById = async (req, res) => {
  try {
    const loisirCategory = await LoisirCategory.findById(req.params.id);
    if (!loisirCategory) {
      return res.status(404).json({ error: 'Loisir category not found' });
    }
    res.status(200).json(loisirCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a loisir category by ID
export const updateLoisirCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const loisirCategory = await LoisirCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!loisirCategory) {
      return res.status(404).json({ error: 'Loisir category not found' });
    }
    res.status(200).json(loisirCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a loisir category by ID
export const deleteLoisirCategory = async (req, res) => {
  try {
    const loisirCategory = await LoisirCategory.findByIdAndDelete(req.params.id);
    if (!loisirCategory) {
      return res.status(404).json({ error: 'Loisir category not found' });
    }
    res.status(200).json({ message: 'Loisir category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
