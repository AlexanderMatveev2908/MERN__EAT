import { body } from "express-validator";
import { REG_PWD } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorManageAccount = [
  body("password").matches(REG_PWD).withMessage("Invalid password"),

  handleValidator(401),
];
