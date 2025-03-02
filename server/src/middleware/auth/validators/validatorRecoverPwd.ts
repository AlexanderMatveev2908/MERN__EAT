import { body } from "express-validator";
import { REG_MONGO, REG_PWD, REG_TOKEN } from "../../../constants/regex";
import { handleValidator } from "../../../utils/handleValidator";

export const validatorRecoverPwd = [
  body("userId").matches(REG_MONGO).withMessage("invalid id"),
  body("token").matches(REG_TOKEN).withMessage("invalid token"),
  body("password").matches(REG_PWD).withMessage("Invalid password"),

  handleValidator,
];
