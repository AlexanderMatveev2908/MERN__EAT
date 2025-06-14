import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateReviewId = [
  check("revId").isMongoId().withMessage("Invalid review id"),

  handleValidator(400),
];
