import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import usermodel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc    signup
// @route   GET /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res, next) => {
  const user = await usermodel.create(req.body);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.status(201).json({ data: user, token });
});

// @desc    Login
// @route   GET /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const user = await usermodel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  delete user._doc.password;
  res.status(200).json({ data: user, token });
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
    console.log(decoded);
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

export { signup, login, allowedTo, protect };
