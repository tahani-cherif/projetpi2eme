import Circuit from "../models/circuit.js";

// Create a new circuit
export const createCircuit = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path); // Get image paths from the uploaded files
    const circuitData = { ...req.body, images };
    const circuit = new Circuit(circuitData);
    await circuit.save();
    res.status(201).json(circuit);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const images = req.files ? req.files.map((file) => file.path) : undefined;
    const circuitData = images ? { ...req.body, images } : req.body;
    const circuit = await Circuit.findByIdAndUpdate(
      req.params.id,
      circuitData,
      { new: true, runValidators: true }
    ).populate("station loisir");
    if (!circuit) {
      return res.status(404).json({ error: "Circuit not found" });
    }
    res.status(200).json(circuit);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
