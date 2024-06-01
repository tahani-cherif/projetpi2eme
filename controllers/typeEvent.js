import typeEvent from "../models/typeEvent.js";

export const gettypevent = async (req, res) => {
  try {
    console.log("eee")
    const typevent = await typeEvent.find();
    
    res.status(200).json(typevent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const gettypeventbyid = async (req, res) => {
  try {
    console.log("eee")
    const typevent = await typeEvent.findById(req.params.id);
    
    res.status(200).json(typevent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const creattypevent = async (req, res) => {
  try {
    const typevent = new typeEvent(req.body);
    await typevent.save();
    res.status(201).json(typevent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatetypevent = async (req, res) => {
  try {
    const typevent = await typeEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!typevent) return res.status(404).json({ message: "type not found" });
    res.status(200).json(typevent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletetypevent = async (req, res) => {
  try {
    console.log("ggg",req.params.id)
    const typevent = await typeEvent.findByIdAndDelete(req.params.id);
    if (!typevent) return res.status(404).json({ message: "type not found" });
    res.status(200).json({ message: "type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
