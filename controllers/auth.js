import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import usermodel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// @desc    signup
// @route   GET /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res, next) => {
  const user = await usermodel.create(req.body);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
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
    from: "cheriftahani92@gmail.com",
    to: req.body.email,
    subject: "Email Verification",
    html: `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header img {
                max-width: 100px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .content a {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #FB404B;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="http://localhost:8080/image/logo.png" alt="Your Company Logo">
            </div>
            <div class="content">
                <h1>Confirm Your Account</h1>
                <p>Hello,</p>
                <p>Thank you for registering with our service. Please click the button below to confirm your account:</p>
                <a href="http://localhost:8080/api/auth/approvedaccount/${token}">Confirm Account</a>
                <p>If you did not create this account, please ignore this email.</p>
                <p>Best regards,</p>
                <p>Tunisie insider</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Tunisie insider. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `,
  };
  transporter.sendMail(mail_configs, function (error, info) {
    if (error) {
      return next(new ApiError(error, 404));
    }
    return res.status(200).json({
      success: true,
      data: user,
      token,
      message:
        "User registered. Please check your email to verify your account.",
    });
  });
});

// @desc    Login
// @route   GET /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const user = await usermodel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  if (!user.status) {
    return next(new ApiError("your account is not approved", 503));
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  delete user._doc.password;
  res.status(200).json({ data: user, token });
});

// @desc    forgetpassword
// @route   GET /api/auth/forgetpassword
// @access  Public
const forgetpassword = asyncHandler(async (req, res, next) => {
  const user = await usermodel.findOne({ email: req.body.email });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  if (!user) throw new NotAcceptable();
  await usermodel.findByIdAndUpdate(user?._id, {
    tokenPassword: token,
  });
  const subject = "Reset Password";
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
    to: req.body.email,
    subject: subject,
    html: `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header img {
                max-width: 100px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .content a {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #FB404B;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="http://localhost:8080/image/logo.png" alt="Your Company Logo">
            </div>
            <div class="content">
                <h1>Reset Your Password</h1>
                <p>Hello,</p>
                <p>We received a request to reset your password. Please click the button below to reset your password:</p>
                <a href="http://localhost:4200/#/forgetpassword/${token}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,</p>
                <p>Tunisie insider</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Tunisie insider. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `,
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
// @desc    update password
// @route   GET /api/auth/updatepassword
// @access  Public
const updatepassword = asyncHandler(async (req, res, next) => {
  const user = await usermodel.find({ tokenPassword: req.body.token });
  if (user.length === 0) throw new NotAcceptable();
  console.log(user);
  const password = await bcrypt.hash(req.body.password, 12);
  await usermodel.findOneAndUpdate(
    { _id: user[0]._id },
    {
      tokenPassword: "",
      password: password,
    }
  );
  res.status(200).json({
    success: true,
    data: "password updated",
  });
});

// @desc   Assurer que l'utilisateur est connecté
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Si le jeton n'existe pas, renvoyer une erreur
  if (!token) {
    return next(
      new ApiError(
        "Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette route",
        401
      )
    );
  }

  try {
    // Vérifier le jeton et extraire l'ID de l'utilisateur
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Vérifier si l'utilisateur existe
    const currentUser = await usermodel.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new ApiError(
          "L'utilisateur auquel appartient ce jeton n'existe pas",
          401
        )
      );
    }

    // Vérifier si l'utilisateur a changé son mot de passe après la création du jeton
    if (currentUser.passwordChangedAt) {
      const passChangedTimestamp = parseInt(
        currentUser.passwordChangedAt.getTime() / 1000,
        10
      );
      // Mot de passe changé après la création du jeton (Erreur)
      if (passChangedTimestamp > decoded.iat) {
        return next(
          new ApiError(
            "L'utilisateur a récemment changé son mot de passe. Veuillez vous reconnecter.",
            401
          )
        );
      }
    }

    // Attacher les informations de l'utilisateur à l'objet req.user
    req.user = currentUser;
    next();
  } catch (error) {
    // Gérer les erreurs de vérification du jeton
    return next(
      new ApiError("Jeton invalide. Veuillez vous reconnecter.", 401)
    );
  }
});

// @desc    Rôles d'accès
const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("Vous n'êtes pas autorisé à accéder à cette route", 403)
      );
    }
    next();
  });
const approvedaccount = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await usermodel.findById(decoded.userId);
    if (!user) {
      return res.status(400).send("Invalid token");
    }
    await usermodel.findByIdAndUpdate(user._id, { status: true });

    res.send("Email verified successfully");
  } catch (error) {
    res.status(500).send("Error verifying email");
  }
});
export {
  signup,
  login,
  allowedTo,
  protect,
  forgetpassword,
  updatepassword,
  approvedaccount,
};
