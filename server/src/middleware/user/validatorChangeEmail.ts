import { body } from "express-validator";
import { REG_EMAIL, REG_TOKEN } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorChangeEmail = [
  body("manageAccountToken").matches(REG_TOKEN).withMessage("Invalid token"),
  handleValidator(401),

  body("newEmail").matches(REG_EMAIL).withMessage("Invalid email"),
  handleValidator(400),
];
