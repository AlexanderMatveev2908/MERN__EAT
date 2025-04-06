import { body } from "express-validator";
import { REG_TOKEN } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorVerifyNewEmail = [
  body("token").matches(REG_TOKEN).withMessage("Invalid token"),
  body("userId").isMongoId().withMessage("Invalid userId"),

  handleValidator(401),
];
