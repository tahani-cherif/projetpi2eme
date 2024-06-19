import CAT from "../models/category-offre.js";
import { validationResult } from "express-validator";

export function addOnce(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json(validationResult(req).array());
    } else {
        CAT.create(req.body)
            .then((cat) => {
                res.status(201).json(cat);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

export function getAll(req, res) {
    CAT.find({})

        .then((cat) => {
            res.status(200).json(cat);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
export function getOnce(req, res) {
    CAT.findById(req.params.categorie)
        .then((cat) => {
            console.log(cat)
            res.status(200).json(cat);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
export function deleteOnce(req, res) {
    CAT.findOneAndDelete({
        _id: req.params.categorie,
    })
        .then((cat) => {
            res.status(200).json(cat);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

