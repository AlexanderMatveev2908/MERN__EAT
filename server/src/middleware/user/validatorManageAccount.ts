import { body } from "express-validator";
import { REG_PWD } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorManageAccount = [
  body("password").matches(REG_PWD).withMessage("Invalid password"),

  handleValidator(401),
];
