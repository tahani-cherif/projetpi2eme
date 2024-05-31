import Loisir from '../models/loisir.js';
import { validationResult } from 'express-validator';

// Create a new loisir
export const createLoisir = async (req, res) => {
  try {
    const loisir = new Loisir(req.body);
    await loisir.save();
    res.status(201).json(loisir);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all loisirs
export const getAllLoisirs = async (req, res) => {
  try {
    const loisirs = await Loisir.find().populate('category');
    res.status(200).json(loisirs);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single loisir by ID
export const getLoisirById = async (req, res) => {
  try {
    const loisir = await Loisir.findById(req.params.id).populate('category');
    if (!loisir) {
      return res.status(404).json({ error: 'Loisir not found' });
    }
    res.status(200).json(loisir);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a loisir by ID
export const updateLoisir = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const loisir = await Loisir.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!loisir) {
      return res.status(404).json({ error: 'Loisir not found' });
    }
    res.status(200).json(loisir);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a loisir by ID
export const deleteLoisir = async (req, res) => {
  try {
    const loisir = await Loisir.findByIdAndDelete(req.params.id);
    if (!loisir) {
      return res.status(404).json({ error: 'Loisir not found' });
    }
    res.status(200).json({ message: 'Loisir deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
