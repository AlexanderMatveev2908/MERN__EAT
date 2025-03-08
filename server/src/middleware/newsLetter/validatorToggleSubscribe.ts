import { body } from "express-validator";
import { handleValidator } from "../../utils/handleValidator";

export const validatorToggleSubscribe = [
  body("type").isIn(["subscribe", "unsubscribe"]).withMessage("Invalid type"),

  handleValidator(400),
];
