import { check } from "express-validator";
import { REG_DISH_NAME } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorUpdateDish = [
  check("dishId").isMongoId().withMessage("invalid dish id"),

  check("name").matches(REG_DISH_NAME).withMessage("invalid dish name"),
  check("price").toInt().isInt({ min: 0.01 }).withMessage("invalid price"),
  check("quantity").toInt().isInt().withMessage("invalid quantity"),

  check().custom((_, { req }) =>
    !req.body?.images && !req?.files?.length
      ? Promise.reject("Invalid images")
      : true
  ),

  check().custom((_, { req }) => {
    return true;
  }),

  handleValidator(400),
];
