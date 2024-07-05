
import reservationmodel from "../models/reservation.js";
import eventmodel from "../models/event.js";
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';



export const getreservation = async (req, res) => {
  try {

    const reservation = await reservationmodel.find({ event: req.params.id }).populate("event", "Name");

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
      return res.status(200).json("Nombre de reservation complet")
    }

    const reservation = await reservationmodel.create(req.body);
    await eventmodel.findByIdAndUpdate(event._id, { nmbrReservation: event.nmbrReservation + 1 })
    if (reservation.email){

      sendMail(reservation.email, "Reservation created", getMessage(event, reservation, "created"));
    }

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatereservation = async (req, res) => {
  try {
    const reservation = await reservationmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ message: "reservation not found" });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletereservation = async (req, res) => {
  try {
    console.log("ggg", req.params.id)
    const reservation = await reservationmodel.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: "type not found" });
    let event = await eventmodel.findById(reservation.event._id);
    event = await eventmodel.findByIdAndUpdate(event._id, { nmbrReservation: event.nmbrReservation - 1 });
    if (reservation.email){
      sendMail(reservation.email, "Reservation canceled", getMessage(event, reservation, "canceled"));
    }
    res.status(200).json({ message: "reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

function sendMail(to, object, message) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your Exchange server hostname
    port: 587, // Replace with your Exchange SMTP port (usually 587 or 25)
    secure: false, // true for 465, false for other ports
    auth: {
      user: "cheriftahani92@gmail.com",
      pass: "gnaqzqjdlqzyhxyl",
    },
  });

  // Setup email data
  let mailOptions = {
    from: 'cheriftahani92@gmail.com', // Sender address
    to: `${to}`, // List of receivers
    subject: `${object}`, // Subject line
    text: `${message}`, // Plain text body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });

}


function getMessage(event, reservation, action) {
  return `Hello ${reservation.name}, you booking for the event ${event.Name} have been ${action}. Thank you`;
}