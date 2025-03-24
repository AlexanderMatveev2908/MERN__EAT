import { check } from "express-validator";
import { REG_PRICE, REG_QTY } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const checkNumericFields = [
  check().custom((_, { req }) =>
    Object.entries(req?.query ?? {}).some(
      ([key, val]) =>
        (["minPrice", "maxPrice"].includes(key) && !REG_PRICE.test(val)) ||
        (["minQUantity", "maxQuantity"].includes(key) && !REG_QTY.test(val)) ||
        (["minPrice", "maxPrice", "minQuantity", "maxQuantity"].includes(key) &&
          isNaN(+val))
    )
      ? Promise.reject("Bad request sort / numeric")
      : true
  ),

  check("minPrice").custom((val, { req }) =>
    req.query?.maxPrice && +val > +req.query?.maxPrice
      ? Promise.reject("Bad request minPrice")
      : true
  ),
  check("maxPrice").custom((val, { req }) =>
    req.query?.minPrice && +val < +req.query?.minPrice
      ? Promise.reject("Bad request maxPrice")
      : true
  ),

  check("minQuantity").custom((val, { req }) =>
    req.query?.maxQuantity && +val > +req.query?.maxQuantity
      ? Promise.reject("Bad request minQuantity")
      : true
  ),
  check("maxQuantity").custom((val, { req }) =>
    req.query?.minQuantity && +val < +req.query?.minQuantity
      ? Promise.reject("Bad request maxQuantity")
      : true
  ),

  handleValidator(400),
];
