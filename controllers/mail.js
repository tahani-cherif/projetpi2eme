import usermodel from "../models/user.js";

import asyncHandler from "express-async-handler";

import ApiError from "../utils/apiError.js";

import nodemailer from "nodemailer";


/*admin*/
export const notifadminmail = async (userEmail, subject, object, sujet) => {
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
export const notifclientmail = async (email, subject, object) => {
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
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <p style="font-size:1.1em">Bonjour,</p>
                  <p style="font-size:1.1em">reclamation est bien soumise</p>
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