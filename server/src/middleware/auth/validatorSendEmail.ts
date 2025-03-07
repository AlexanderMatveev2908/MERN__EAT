import { body } from "express-validator";
import { REG_EMAIL } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorSendEmail = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .matches(REG_EMAIL)
    .withMessage("Invalid format"),
  body("type")
    .isIn(["verify-account", "recover-pwd"])
    .withMessage("Invalid type"),

  handleValidator,
];
