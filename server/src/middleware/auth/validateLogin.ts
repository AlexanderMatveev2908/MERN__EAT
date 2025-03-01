import { body, validationResult } from "express-validator";
import { REG_EMAIL, REG_PWD } from "../../constants/regex";
import { NextFunction, Request, Response } from "express";

export const validatorLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email")
    .matches(REG_EMAIL)
    .withMessage("Invalid Email format"),

  body("password").matches(REG_PWD).withMessage("Invalid password"),

  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
