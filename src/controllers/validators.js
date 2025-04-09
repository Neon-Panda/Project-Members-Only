import { body, validationResult } from "express-validator";
import * as db from "../database/query.js";

export const registerBodyChecker = [
  body(["first_name", "last_name"])
    .trim()
    .isAlpha()
    .isLength({ min: 3, max: 16 })
    .withMessage("First & last name must be between 3-16 characters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid")
    .bail()
    .custom(async (inputEmail) => {
      const { rows: emailInDB } = await db.getUserByEmail(inputEmail);
      if (emailInDB.length > 0) throw new Error("Email already registered");
    }),
  body("password")
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be between 8-24 characters long"),
  body("confirmPassword")
    .matches("password")
    .withMessage("Confirm Password must match Password"),
];

export function register(request, response, next) {
  const results = validationResult(request);
  if (!results.isEmpty()) return response.send(results);
  next();
}
