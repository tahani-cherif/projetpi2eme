import mongoose from "mongoose";
import Station from "../models/station.js";
import typeTransport from "../models/typeTransport.js";

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
    const stations = await Station.find().populate("typeTransport");
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stations sorted by TypeTransport
export const getStationsByTypeTransport = async (req, res) => {
  try {
    const { id, latitude, longitude } = req.params;

    // Ensure latitude and longitude are numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Create a new ObjectId instance for the typeTransport field
    const typeTransportObjectId = new mongoose.Types.ObjectId(id);

    const stations = await Station.aggregate([
      {
        $match: { typeTransport: typeTransportObjectId }
      },
      {
        $addFields: {
          distance: {
            $sqrt: {
              $add: [
                { $pow: [{ $subtract: ["$latitude", lat] }, 2] },
                { $pow: [{ $subtract: ["$longitude", lng] }, 2] }
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'typetransports', // Assuming the collection name is "typetransports"
          localField: 'typeTransport',
          foreignField: '_id',
          as: 'typeTransport'
        }
      },
      {
        $unwind: '$typeTransport'
      },
      {
        $project: {
          name: 1,
          typeTransportName: '$typeTransport.name',
          latitude: 1,
          longitude: 1,
          distance: { $multiply: ["$distance", 100] }, // Convert meters to kilometers
        }
      },
      {
        $sort: { distance: 1 }
      }
    ]);

    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a station by ID
export const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate(
      "typeTransport"
    );
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
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("typeTransport");
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

// Get stations sorted by distance
export const getStationsByDistance = async (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const stations = await Station.aggregate([
      {
        $addFields: {
          distance: {
            $sqrt: {
              $add: [
                { $pow: [{ $subtract: ["$latitude", latitude] }, 2] },
                { $pow: [{ $subtract: ["$longitude", longitude] }, 2] },
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "typetransports", // Assuming the collection name is "typetransports"
          localField: "typeTransport",
          foreignField: "_id",
          as: "typeTransport",
        },
      },
      {
        $unwind: "$typeTransport",
      },
      {
        $project: {
          name: 1,
          typeTransportName: "$typeTransport.name",
          latitude: 1,
          longitude: 1,
          distance: { $multiply: ["$distance", 100] }, // Convert meters to kilometers
        },
      },
      {
        $sort: { distance: 1 },
      },
    ]);
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
