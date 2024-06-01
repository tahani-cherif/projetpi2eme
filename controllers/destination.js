import Destination from '../models/destination.js';
import { validationResult } from 'express-validator';
import cloudinary from '../cloudinary.js';

// Create a new destination
export const createDestination = async (req, res) => {
  
  try {
    
    let imageUrl = '';
    if (req.file ) {
     
      //const file = req.files.image;
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'destinations'
      });
      
      imageUrl = result.secure_url;
    }

    const destination = new Destination({
      ...req.body,
      imageUrl
    });

    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id).populate('loisir');
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a destination by ID
export const updateDestination = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let updateData = req.body;
    if (req.files && req.files.image) {
      const file = req.files.image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'destinations'
      });
      updateData.imageUrl = result.secure_url;
    }

    const destination = await Destination.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a destination by ID
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
