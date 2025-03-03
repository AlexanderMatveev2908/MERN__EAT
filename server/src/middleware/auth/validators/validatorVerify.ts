import { body } from "express-validator";
import { REG_MONGO, REG_TOKEN } from "../../../constants/regex";
import { handleValidator } from "../../../utils/handleValidator";

export const validatorVerify = [
  body("token").matches(REG_TOKEN).withMessage("invalid token"),
  body("userId").matches(REG_MONGO).withMessage("invalid userId"),

  handleValidator,
];
