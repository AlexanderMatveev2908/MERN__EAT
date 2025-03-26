import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateDishId = [
  check("dishId").isMongoId().withMessage("invalid dish, chef made too spicy"),

  handleValidator(400),
];
