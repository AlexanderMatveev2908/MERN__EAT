import { body, check } from "express-validator";
import { REG_EMAIL } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";
import { query } from "express";

export const validatorSendEmail = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(REG_EMAIL)
    .withMessage("Invalid format"),
  check("type").custom((val: string) =>
    ["verify-account", "recover-pwd"].includes(val)
      ? true
      : Promise.reject("Invalid type")
  ),

  handleValidator,
];
