import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateActionsCart = [
  check("dishId").isMongoId().withMessage("invalid dish, chef made too spicy"),

  handleValidator(400),
];
