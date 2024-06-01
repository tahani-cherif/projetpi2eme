
import reservationmodel from "../models/reservation.js";
import eventmodel from "../models/event.js";

export const getreservation = async (req, res) => {
  try {

    console.log("eee")
    const reservation = await reservationmodel.find();
    
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getreservationbyid = async (req, res) => {
  try {

    console.log("eee")
    const reservation = await reservationmodel.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const creatreservation = async (req, res) => {
  try {
    console.log(req.body)
    const event = await eventmodel.findById(req.body.event)
    console.log(event)
    if (event.nmbrReservation >= event.nmbr) { 
      return res.status(200).json("Nombre de reservation complet")}
      
    const reservation = await reservationmodel.create(req.body);
     await eventmodel.findByIdAndUpdate(event._id,{ nmbrReservation:event.nmbrReservation+1})
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatereservation = async (req, res) => {
  try {
    const reservation = await reservationmodel.findByIdAndUpdate(req.params.id, req.body);
    if (!reservation) return res.status(404).json({ message: "reservation not found" });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletereservation = async (req, res) => {
  try {
    console.log("ggg",req.params.id)
    const reservation = await reservationmodel.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: "reservation not found" });
    res.status(200).json({ message: "reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
