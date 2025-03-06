import { body } from "express-validator";
import { REG_TOKEN } from "../../constants/regex";
import { handleValidator } from "../../utils/handleValidator";

export const validatorUnsubscribeNewsLetterLink = [
  body("userId").isMongoId().withMessage("Invalid userId"),
  body("token").matches(REG_TOKEN).withMessage("Invalid token"),

  handleValidator,
];
