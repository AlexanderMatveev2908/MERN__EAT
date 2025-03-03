import { body } from "express-validator";
import { REG_EMAIL, REG_PWD } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email")
    .matches(REG_EMAIL)
    .withMessage("Invalid Email format"),

  body("password").matches(REG_PWD).withMessage("Invalid password"),

  handleValidator,
];
