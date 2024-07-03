import mongoose from "mongoose";
import Circuit from "../models/circuit.js";

// Create a new circuit
export const createCircuit = async (req, res) => {
  try {
    const { name, duree, price, startDate, endDate, address, station, loisir } = req.body;
    const host = req.headers.host;
    const images = req.files.map(file => `http://${host}/${file.path.replace(/\\/g, '/')}`);

    // Ensure loisir is an array of ObjectIds
    const loisirArray = Array.isArray(loisir) ? loisir : loisir.split(',').map(id => id.trim());

    // Validate each loisir ID to ensure it's a valid ObjectId
    if (!loisirArray.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid loisir ID(s)' });
    }

    const newCircuit = new Circuit({
      name,
      duree,
      price,
      startDate,
      endDate,
      address,
      images,
      station,
      loisir: loisirArray
    });

    const savedCircuit = await newCircuit.save();
    res.status(201).json(savedCircuit);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};



// Get all circuits
export const getAllCircuits = async (req, res) => {
  try {
    const circuits = await Circuit.find().populate("station loisir");
    res.status(200).json(circuits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a circuit by ID
export const getCircuitById = async (req, res) => {
  try {
    const circuit = await Circuit.findById(req.params.id).populate(
      "station loisir"
    );
    if (!circuit) {
      return res.status(404).json({ error: "Circuit not found" });
    }
    res.status(200).json(circuit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a circuit
export const updateCircuit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duree, price, startDate, endDate, address, station, loisir } = req.body;
    const host = req.headers.host;
    const images = req.files.map(file => `http://${host}/${file.path.replace(/\\/g, '/')}`);
    // Ensure loisir is an array of ObjectIds
    const loisirArray = Array.isArray(loisir) ? loisir : loisir.split(',').map(id => id.trim());

    // Validate each loisir ID to ensure it's a valid ObjectId
    if (!loisirArray.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid loisir ID(s)' });
    }
    const updatedCircuit = await Circuit.findByIdAndUpdate(
      id,
      { name, duree, price, startDate, endDate, address, images, station, loisir:loisirArray },
      { new: true }
    );

    if (!updatedCircuit) {
      return res.status(404).json({ message: 'Circuit not found' });
    }

    res.status(200).json(updatedCircuit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a circuit
export const deleteCircuit = async (req, res) => {
  try {
    const circuit = await Circuit.findByIdAndDelete(req.params.id);
    if (!circuit) {
      return res.status(404).json({ error: "Circuit not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
