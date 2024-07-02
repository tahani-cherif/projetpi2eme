import Station from "../models/station.js";

// Create a new station
export const createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stations
export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().populate('typeTransport');
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a station by ID
export const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate('typeTransport');
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    res.status(200).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a station
export const updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('typeTransport');
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    res.status(200).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a station
export const deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
