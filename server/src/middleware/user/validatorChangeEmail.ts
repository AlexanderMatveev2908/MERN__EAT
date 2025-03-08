import { body } from "express-validator";
import { REG_EMAIL, REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorChangeEmail = [
  body("newEmail").matches(REG_EMAIL).withMessage("Invalid email"),
  body("manageAccountToken").matches(REG_TOKEN).withMessage("Invalid token"),

  handleValidator(401),
];
