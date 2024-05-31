import usermodel from "../models/user.js";

import asyncHandler from "express-async-handler";

import ApiError from "../utils/apiError.js";



export const notifmail= asyncHandler(async (req, res, next) => {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) throw new NotAcceptable();
    await usermodel.findByIdAndUpdate(user?._id, {
      tokenPassword: req.body.token,
    });
  
    
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
      from: req.body.email,
      to: "cheriftahani92@gmail.com", /*avoir mail*/
      subject: req.body.subject,
      html: `<!DOCTYPE html>
                  <html lang="en" >
                  <head>
                    <meta charset="UTF-8">
                    <title>${req.body.object}</title>
                    
                  </head>
                  <body>
                  <!-- partial:index.partial.html -->
                  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                      <p style="font-size:1.1em">Bonjour,</p>
                      <p style="font-size:1.1em">Une nouvelle reclamation a ete soumise pour ${req.body.sujet}</p>

                  </div>
                  <!-- partial -->
                    
                  </body>
                  </html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        return next(new ApiError(error, 404));
      }
      return res.status(200).json({
        success: true,
        data: "Email sent",
      });
    });
  });
