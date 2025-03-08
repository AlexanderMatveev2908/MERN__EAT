import { body } from "express-validator";
import { REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorDeleteAccount = [
  body("manageAccountToken").matches(REG_TOKEN).withMessage("Invalid token"),

  handleValidator(401),
];
