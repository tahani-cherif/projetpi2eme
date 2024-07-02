import { validationResult } from "express-validator";

import Reclamation from "../models/reclamation.js";
import Reponse from "../models/reponse.js";
import { notifclientmail, notifadminmail } from "./mail.js";
import pdfkit from 'pdfkit';
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
  const user = req.user;
  console.log(user.email)
  const validTypes = ["offre", "circuit", "evenement", "loisir", "destination"];
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else if (!validTypes.includes(req.body.type)) {
    res.status(400).json({ error: "Les types acceptés sont: 'Offre', 'Circuit', 'Evenement', 'Loisir' ou 'Destination' ." });

  } else
   { Reclamation.create({
      message: req.body.message,
      status: req.body.status,
      type: req.body.type,
      idType: req.body.idType

    })
      .then((newReclamation) => {
        console.log(newReclamation);

        notifadminmail(user.email, req.body.type, req.body.message, "objet").then(response => {
          console.log(response);
        }).catch(error => {
          console.error("Error:", error);
        });
        /* appel fctmailclient*/
        notifclientmail(user.email, req.body.type, req.body.message,newReclamation.id ).then(response => {
          console.log(response);
          

        })
          .catch(error => {
            console.error("Error:", error);
          });

          res.status(200).json(newReclamation);
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
export async function generatePdf(req, res) {
  try {
    const { id } = req.params;
    const reclamation = await Reclamation.findById(id);

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
    }).font('Helvetica').text(reclamation.type, {
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
    type: req.body.type,


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
  Reclamation.findByIdAndDelete({ _id: req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

}
