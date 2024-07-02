import { validationResult } from "express-validator";

import Reponse from "../models/reponse.js";
import Reclamation from "../models/reclamation.js";
import { notifclientmail } from "./mailRep.js";

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
  const user = req.user;
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Reclamation.findById(req.params.idReclamation)
      .then((newReclamation) => {
        Reponse.create({
          message: newReclamation.message,
          status: newReclamation.status,
          type: newReclamation.type,
          idReclamation: newReclamation._id,

        })
          .then((newReponse) => {
            notifclientmail(user.email, req.body.type, req.body.message,req.body.status, newReclamation.id).then(response => {
              console.log(response);
            })
              .catch(error => {
                console.error("Error:", error);
              });
            res.status(200).json({
              message: newReclamation.message,
              status: newReclamation.status,
              type: newReclamation.type,

              reponse: newReponse

            });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
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
    reclamationId: req.body.reclamationId


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
