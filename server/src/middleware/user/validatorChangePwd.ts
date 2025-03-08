import { body } from "express-validator";
import { REG_PWD, REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorChangePwd = [
  body("manageAccountToken").matches(REG_TOKEN).withMessage("Invalid token"),
  handleValidator(401),

  body("newPassword").matches(REG_PWD).withMessage("Invalid password"),
  handleValidator(400),
];
