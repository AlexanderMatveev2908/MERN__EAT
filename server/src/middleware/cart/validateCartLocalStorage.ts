import { check } from "express-validator";
import {
  REG_DISH_NAME,
  REG_MONGO,
  REG_PRICE,
  REG_QTY,
} from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateCartLocalStorage = [
  check().custom((_, { req }) => {
    const cart = req.body.cart;
    let isValid = true;

    if (!cart?.items?.length || !cart.totQty || !cart.totPrice)
      throw new Error("Invalid cart");

    let i = 0;
    do {
      const curr = cart.items[i];
      if (!REG_PRICE.test(curr.price + "") || !curr.price) isValid = false;
      if (!REG_QTY.test(curr.quantity + "") || !curr.quantity) isValid = false;
      if (!REG_DISH_NAME.test(curr.name)) isValid = false;
      if (!REG_MONGO.test(curr.dishId)) isValid = false;

      if (!isValid) break;

      i++;
    } while (i < cart.items.length);

    if (!isValid) throw new Error("Invalid cart");

    return true;
  }),

  handleValidator(400),
];
