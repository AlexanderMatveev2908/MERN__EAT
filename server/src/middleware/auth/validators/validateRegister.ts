import { body, validationResult } from "express-validator";
import { REG_EMAIL, REG_NAME, REG_PWD } from "../../../constants/regex";
import { NextFunction, Request, Response } from "express";

export const validatorRegister = [
  body("firstName").matches(REG_NAME).withMessage("Invalid First Name"),
  body("lastName").matches(REG_NAME).withMessage("Invalid Last Name"),

  body("email")
    .isEmail()
    .withMessage("Invalid Email")
    .matches(REG_EMAIL)
    .withMessage("Invalid Email format"),

  body("password").matches(REG_PWD).withMessage("Invalid password"),

  body("acceptedTerms")
    .equals("true")
    .withMessage("Terms Accepted needed to proceed"),

  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
