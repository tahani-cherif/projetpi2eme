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
    html: `<p>Please verify your email by clicking the following link: <a href="http://localhost:8080/api/auth/approvedaccount/${token}">http://localhost:8080/api/auth/approvedaccount/${token}</a></p>`,
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
                    <p style="font-size:1.1em">cliquer sur cette button pour mise a jour votre button</p>
                 <a href="http://localhost:4200/#/forgetpassword/${token}"><button>update password</button></a>
                  </div>
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
