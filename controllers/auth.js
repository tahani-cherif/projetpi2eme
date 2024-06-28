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

export { signup, login };
