import { validationResult } from "express-validator";

import Reclamation from "../models/reclamation.js";

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
      email: req.body.email,
      type: req.body.type,
     
      
    })
      .then((newReclamation) => {
        res.status(200).json({
          message: newReclamation.message,
          email: newReclamation.email,
          type: newReclamation.type,
          
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Reclamation.findById(req.params.id)
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
      email: req.body.email,
      type: req.body.type,
     
    
  }
  Reclamation.findByIdAndUpdate(req.params._id, newReclamation)
    .then((doc1) => {
      Reclamation.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
