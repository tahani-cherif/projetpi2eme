import { validationResult } from "express-validator";

import Reclamation from "../models/reclamation.js";
import { notifclientmail, notifadminmail } from "./mail.js";


export function getAll(req, res) {
  Reclamation.find({})
    .then((docs) => { 
      
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Reclamation.create({
      message: req.body.message,
      status: req.body.status,
      type: req.body.type,
     
      
    })
      .then((newReclamation) => {

        notifadminmail(req.body.email, req.body.type, req.body.message, "objet").then(response => {
          console.log(response);
        }) .catch(error => {
          console.error("Error:", error);
        });
        /* appel fctmailclient*/
        notifclientmail(req.body.email, req.body.type, req.body.message).then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error("Error:", error);
        });
        res.status(200).json({
          message: newReclamation.message,
          status: newReclamation.status,
          type: newReclamation.type,
          
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Reclamation.findById(req.params._id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newReclamation = {};
  
    
    newReclamation = {
      message: req.body.message,
      status: req.body.status,
      type: req.body.type,
     
    
  }
  Reclamation.findByIdAndUpdate(req.params._id, newReclamation)
    .then((doc1) => {
      Reclamation.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc1);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

}
export function deleteOnce(req, res) {
  Reclamation.findByIdAndDelete({_id:req.params._id})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
    
}
