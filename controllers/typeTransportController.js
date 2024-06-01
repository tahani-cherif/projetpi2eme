import TypeTransport from "../models/typeTransport.js";

// Create a new type of transport
export const createTypeTransport = async (req, res) => {
  try {
    const typeTransport = new TypeTransport(req.body);
    await typeTransport.save();
    res.status(201).json(typeTransport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all types of transport
export const getAllTypeTransports = async (req, res) => {
  try {
    const typeTransports = await TypeTransport.find();
    res.status(200).json(typeTransports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a type of transport by ID
export const getTypeTransportById = async (req, res) => {
  try {
    const typeTransport = await TypeTransport.findById(req.params.id);
    if (!typeTransport) {
      return res.status(404).json({ error: "TypeTransport not found" });
    }
    res.status(200).json(typeTransport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a type of transport
export const updateTypeTransport = async (req, res) => {
  try {
    const typeTransport = await TypeTransport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!typeTransport) {
      return res.status(404).json({ error: "TypeTransport not found" });
    }
    res.status(200).json(typeTransport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a type of transport
export const deleteTypeTransport = async (req, res) => {
  try {
    const typeTransport = await TypeTransport.findByIdAndDelete(req.params.id);
    if (!typeTransport) {
      return res.status(404).json({ error: "TypeTransport not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
