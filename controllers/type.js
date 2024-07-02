import { validationResult } from "express-validator";

import Type from "../models/type.js";

// export function getAll(req, res) {
//   Type.find({})
//     .then((docs) => { 
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }

// export function addOnce(req, res) {
//   if (!validationResult(req).isEmpty()) {
//     res.status(400).json({ errors: validationResult(req).array() });
//   } else {
//     Type.create({
//       idEvenement: req.body.idEvenement,
//       idCircuit: req.body.idCircuit,
//       idLoisir: req.body.idLoisir,
//       idOffre: req.body.idOffre,
//       libelles: req.body.libelles,
//     })
//       .then((newType) => {
//         res.status(200).json({
//           idEvenement: newType.idEvenement,
//           idCircuit: newType.idCircuit,
//           idLoisir: newType.idLoisir,
//           idOffre: newType.idOffre,

//         });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err });
//       });
//   }
//   // res.status(200).json( req.body);
// }

// export function getOnce(req, res) {
//   Type.findById(req.params.id)
//     .then((doc) => {
//       res.status(200).json(doc);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }

// export function putOnce(req, res) {
//   let newType = {};
//   newType = {
//     idEvenement: req.body.idEvenement,
//     idCircuit: req.body.idCircuit,
//     idLoisir: req.body.idLoisir,
//     idOffre: req.body.idOffre,
//   };
//   Type.findByIdAndUpdate(req.params.id, newType)
//     .then(() => {
//       Type.findById(req.params.id)
//         .then((updatedType) => {
//           res.status(200).json(updatedType);
//         })
//         .catch((err) => {
//           res.status(500).json({ error: err });
//         });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
    
// }
// export function deleteOnce(req, res) {
//   Type.findByIdAndDelete(req.params._id)
//     .then((deletedType) => {
//       if (!deletedType) {
//         return res.status(404).json({ error: 'Type not found' });
//       }
//       res.status(200).json({ message: 'Type deleted successfully' });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }
export function getAll(req, res) {
 Type.find({})
    .then((docs) => { 
      
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
  const validTypes = ["offre", "circuit", "evenement", "loisir", "destination"];
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else if (!validTypes.includes(req.body.libelles)) {
    res.status(400).json({ error: "Les types acceptés sont: 'Offre', 'Circuit', 'Evenement', 'Loisir' ou 'Destination' ." });
  
  } else {
    Type.create({
      libelles: req.body.libelles,
      
  
    })
      .then((newType) => {
        res.status(200).json({
          libelles: newType.libelles,
          
          
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
 Type.findById(req.params._id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newType = {};
  
    
    newType = {
      libelles: req.body.libelles,
      
  }
  Type.findByIdAndUpdate(req.params._id, newType)
    .then((doc1) => {
      Type.findById(req.params.id)
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
 Type.findByIdAndDelete({_id:req.params._id})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
    
}
