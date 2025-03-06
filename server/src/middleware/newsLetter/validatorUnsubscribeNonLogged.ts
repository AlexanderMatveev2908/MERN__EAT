import { body } from "express-validator";
import { REG_EMAIL, REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorUnsubscribeNewsLetterRetry = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(REG_EMAIL)
    .withMessage("Invalid format"),

  body("token").matches(REG_TOKEN).withMessage("Invalid token"),

  body("typeUser")
    .isIn(["logged", "non-logged"])
    .withMessage("Invalid typeUser"),

  handleValidator,
];
