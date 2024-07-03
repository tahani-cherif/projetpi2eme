import Offre from "../models/offre.js";
import { validationResult } from "express-validator";

export function addOnce(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json(validationResult(req).array());
    } else {
        Offre.create(req.body)
            .then((offre) => {
                res.status(201).json(offre);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

export function getAll(req, res) {
    Offre.find({}).populate('categorie')

        .then((offre) => {
            res.status(200).json(offre);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
export function getOnce(req, res) {
    Offre.findById(req.params.offre)
        .then((offre) => {
            console.log(offre)
            res.status(200).json(offre);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
export function deleteOnce(req, res) {
    Offre.findOneAndDelete({
        _id: req.params.offre,
    })
        .then((offre) => {
            res.status(200).json(offre);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
export async function updateOffre(req, res) {
    try {
        const offre = await Offre.findByIdAndUpdate(req.params.id, req.body);
        if (!offre) {
          return res.status(404).json({ error: 'offre not found' });
        }
        res.status(200).json(offre);
      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

export function countoffre(req, res) {
    Offre.find()
        .then((offre) => {
            res.status(200).json({ count: offre.length });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
