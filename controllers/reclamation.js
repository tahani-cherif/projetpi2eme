import { validationResult } from "express-validator";
import Type from "../models/type.js";

import Reclamation from "../models/reclamation.js";
import Reponse from "../models/reponse.js";
import { notifclientmail, notifadminmail } from "./mail.js";
import pdfkit from 'pdfkit';
export function getAll(req, res) {
  Reclamation.find({}).populate('typeReclamation')
    .then((docs) => {

      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}



export async function addOnce(req, res) {
  const user = req.user || { email: "chaymabothmen@gmail.com" };
  console.log(user.email);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newReclamation = await Reclamation.create({
      message: req.body.message,
      status:"en attente",
      typeReclamation: req.body.typeReclamation
    });

    const type = await Type.findById(req.body.typeReclamation);

    const adminMailPromise = notifadminmail(user.email, type.libelles, req.body.message, "objet");
    const clientMailPromise = notifclientmail(user.email, type.libelles, req.body.message, newReclamation.id);

    await Promise.all([adminMailPromise, clientMailPromise]);

    console.log(newReclamation);
    res.status(200).json(newReclamation);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
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
export async function generatePdf(req, res) {
  try {
    const { id } = req.params;
    const reclamation = await Reclamation.findById(id).populate('typeReclamation');

    if (!reclamation) {
      return res.status(404).send('Reclamation not found');
    }

    const doc = new pdfkit();
    let filename = `reclamation_${id}.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.font('Helvetica-Bold').fontSize(18).text('Détails de réclamation', {
      align: 'center',
      underline: true
    });
    doc.moveDown(2);
    
    doc.font('Helvetica-Bold').fontSize(14).text('De type: ', {
      align: 'left'
    }).font('Helvetica').text(reclamation.typeReclamation.libelles, {
      align: 'left'
    });
    
    // Display the message with bold formatting
    doc.font('Helvetica-Bold').fontSize(14).text('Votre message: ', {
      align: 'left'
    }).font('Helvetica').text(reclamation.message, {
      align: 'left'
    });
    
    doc.moveDown(2); // Add space before the apology message
    doc.font('Helvetica').fontSize(12).text(
      `Suite à votre message, nous vous présentons nos excuses pour tout désagrément causé par l'interruption de notre service. Soyez assurés que notre équipe travaille activement pour résoudre ce problème dans les plus brefs délais. Nous comprenons combien il est important pour vous de pouvoir compter sur la continuité de nos services, et nous mettons tout en œuvre pour rétablir la situation.`,
      {
        align: 'justify'
      }
    );
    
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(
      `Nous vous remercions de votre compréhension et de votre patience pendant que nous corrigeons cette interruption.`,
      {
        align: 'justify'
      }
    );

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function putOnce(req, res) {
  let newReclamation = {};
  console.log(req.params.id)


  newReclamation = {
    message: req.body.message,
    status: req.body.status,
    typeReclamation: req.body.typeReclamation,


  }
  await Reclamation.findByIdAndUpdate(req.params.id, newReclamation)
    .then(async (doc1) => {
      const x = await Reclamation.findById(req.params.id)
      res.status(200).json(x);


    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

}
export function deleteOnce(req, res) {
  Reclamation.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

}
