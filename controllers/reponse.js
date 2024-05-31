import { validationResult } from "express-validator";

import Reponse from "../models/reponse.js";

export function getAll(req, res) {
  Reponse.find({})
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
    Reponse.create({
      message: req.body.message,
      status: req.body.status,
     
     
      
    })
      .then((newReponse) => {
        res.status(200).json({
          message: newReponse.message,
          status: req.body.status,
          
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Reponse.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newReponse = {};
  
    
    newReponse = {
      message: req.body.message,
      status: req.body.status,
     
     
    
  }
  Reponse.findByIdAndUpdate(req.params._id, newReponse)
    .then((doc1) => {
      Reponse.findById(req.params._id)
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
      Reponse.findByIdAndDelete(req.params._id)
        .then((doc) => {
          console.log(doc);
          res.status(200).json(doc);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    
}
