import { body } from "express-validator";
import { REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorVerifyEmail = [
  body("token").matches(REG_TOKEN).withMessage("Invalid token"),
  body("userId").isMongoId().withMessage("Invalid user id"),

  handleValidator,
];
