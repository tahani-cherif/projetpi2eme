import usermodel from "../models/user.js";

import asyncHandler from "express-async-handler";

import ApiError from "../utils/apiError.js";

import nodemailer from "nodemailer";
import reclamation from "../models/reclamation.js";


/*admin*/
export const notifadminmail = async (userEmail, subject, object, sujet) => {
  try {

    const totalReclamations = await reclamation.countDocuments({});
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "cheriftahani92@gmail.com",
        pass: "gnaqzqjdlqzyhxyl",
      },
    });

    const mail_configs = {
      from: userEmail,
      to: "cheriftahani92@gmail.com",
      subject: subject,
      html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>${object}</title>
              </head>
              <body>
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Bonjour,</p>
                  <p style="font-size:1.1em">Une nouvelle reclamation a ete soumise pour ${sujet}</p>
                  <p style="font-size:1.1em">le nombre total de raclamation est: ${totalReclamations}</p>
                </div>
              </div>
              </body>
              </html>`,
    };

    await transporter.sendMail(mail_configs);
    return {
      success: true,
      data: "Email sent",
    };
  } catch (error) {
    throw new ApiError(error.message, 404);
  }
};


/*client*/
export const notifclientmail = async (email, subject, object, reclamationId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "cheriftahani92@gmail.com",
        pass: "gnaqzqjdlqzyhxyl",
      },
    });

    const mail_configs = {
      from: "cheriftahani92@gmail.com",
      to: email,
      subject: subject,
      html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>${object}</title>
              </head>
              <body>
              <div style="font-family: 'Helvetica', 'Arial', sans-serif; min-width: 320px; max-width: 1000px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; color: #333; line-height: 1.6;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #4CAF50;">Notification de Réclamation</h2>
        <p style="font-size: 1.1em;">Bonjour,</p>
        <p style="font-size: 1.1em;">Votre réclamation a bien été soumise.</p>
        <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:8080/reclamation/generate-pdf/${reclamationId}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voir les détails</a>
        </div>
        <p style="font-size: 0.9em; color: #777; margin-top: 20px;">Merci de nous avoir contactés.</p>
    </div>
    <footer style="margin-top: 20px; text-align: center; color: #777;">
        <p style="font-size: 0.8em;">&copy; 2024 Votre Entreprise. Tous droits réservés.</p>
    </footer>
  </div>
              </body>
              </html>`,
    };

    await transporter.sendMail(mail_configs);
    return {
      success: true,
      data: "Email sent",
    };
  } catch (error) {
    throw new ApiError(error.message, 404);
  }
};
