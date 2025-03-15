import { body } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
import { REG_MONGO, REG_PWD, REG_TOKEN } from "../../config/constants/regex.js";

export const validatorRecoverPwd = [
  body("userId").matches(REG_MONGO).withMessage("invalid id"),
  body("token").matches(REG_TOKEN).withMessage("invalid token"),
  handleValidator(401),

  body("password").matches(REG_PWD).withMessage("invalid password"),
  handleValidator(400),
];
