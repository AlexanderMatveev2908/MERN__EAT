import { body } from "express-validator";
import { REG_MONGO, REG_TOKEN } from "../../../constants/regex";
import { handleValidator } from "../../../utils/handleValidator";

export const validatorVerify = [
  body("token").matches(REG_TOKEN).withMessage("invalid token"),
  body("type")
    .isIn(["verify-account", "recover-pwd"])
    .withMessage("invalid type"),
  body("userId").matches(REG_MONGO).withMessage("invalid userId"),

  handleValidator,
];
