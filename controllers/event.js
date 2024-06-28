import event from "../models/event.js";
import Event from "../models/event.js";


export const getAllEvent = async (req,res)=>{
  try{
    const events = await Event.find().populate("typevent","name");
    res.status(200).json(events);
  }catch(error){
    res.status(500).json({message : error.message});
  }
}

export const upcomingEvent = async (req,res)=>{
  try{
    const events = await Event.find({ EndDate: { $gte: new Date() }}).populate("typevent",'name').populate("");
    res.status(200).json(events);
  }catch(err){
    res.status(500).json({message:err.message});
  }
}

export const getEvent = async (req, res) => {
  try {
    const events = await Event.findById(req.params.id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const creatEvent= async (req, res) => {
  try {
  const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDestination = async (req, res) => {
  try {
    const event = await event.findById(req.params.id).populate('region');
    if (!event) return res.status(404).json({ message: "event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateevent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteevent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "event not found" });
    res.status(200).json({ message: "event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
