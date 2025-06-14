import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateOrderId = [
  check("orderId").isMongoId().withMessage("Invalid order id"),

  handleValidator(400),
];
