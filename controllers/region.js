import Region from "../models/region.js";

export const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRegion = async (req, res) => {
  try {
    const region = new Region(req.body);
    await region.save();
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) return res.status(404).json({ message: "Region not found" });
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!region) return res.status(404).json({ message: "Region not found" });
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndDelete(req.params.id);
    if (!region) return res.status(404).json({ message: "Region not found" });
    res.status(200).json({ message: "Region deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
