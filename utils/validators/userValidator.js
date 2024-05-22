import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";

export const getuserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

export const createuserValidator = [
  check("cin").notEmpty().withMessage("CIN required"),
  check("fullName").notEmpty().withMessage("Full name required"),
  check("address").notEmpty().withMessage("Address required"),
  check("phone")
    .notEmpty()
    .withMessage("Phone required")
    .isLength({ min: 8, max: 8 })
    .withMessage("Phone must be 8 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 8 })
    .withMessage("Password too short")
    .custom((password, { req }) => {
      if (password !== req.body.passwordconfirm) {
        throw new Error("Password confirmation does not match");
      }
      return true;
    }),
  check("passwordconfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),
  check("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
  validatorMiddleware,
];

export const updateuserValidator = [
  check("cin").optional(),
  check("fullName").optional(),
  check("address").optional(),
  check("phone")
    .optional()
    .isLength({ min: 8, max: 8 })
    .withMessage("Phone must be 8 characters"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),
  check("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password too short"),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
  validatorMiddleware,
];

export const deleteuserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

export const changeuserpasswordvalidate = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  body("currentpassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordconfirm")
    .notEmpty()
    .withMessage("You must enter your current password confirmation"),
  body("password")
    .notEmpty()
    .withMessage("You must enter your new password")
    .custom(async (val, { req }) => {
      // 1) Verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentpassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }
      // 2) Verify password confirmation
      if (val !== req.body.passwordconfirm) {
        throw new Error("Password confirmation does not match");
      }
      return true;
    }),
  validatorMiddleware,
];
