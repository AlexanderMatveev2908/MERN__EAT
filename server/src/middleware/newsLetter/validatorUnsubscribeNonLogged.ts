import { body } from "express-validator";
import { REG_EMAIL } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorUnsubscribeNewsLetterRetry = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(REG_EMAIL)
    .withMessage("Invalid format"),

  handleValidator,
];
