import { body } from "express-validator";
import { REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorVerifyNewEmail = [
  body("token").matches(REG_TOKEN).withMessage("Invalid token"),
  body("userId").isMongoId().withMessage("Invalid userId"),

  handleValidator(401),
];
