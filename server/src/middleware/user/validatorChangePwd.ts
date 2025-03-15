import { body } from "express-validator";
import { REG_PWD, REG_TOKEN } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorChangePwd = [
  body("manageAccountToken").matches(REG_TOKEN).withMessage("Invalid token"),
  handleValidator(401),

  body("newPassword").matches(REG_PWD).withMessage("Invalid password"),
  handleValidator(400),
];
