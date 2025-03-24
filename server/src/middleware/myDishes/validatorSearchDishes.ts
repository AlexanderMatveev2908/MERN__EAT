import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
import { REG_MONGO, REG_SEARCH } from "../../config/constants/regex.js";

export const validatorSearchDishes = [
  check().custom((_, { req }) => {
    return true;
  }),

  check("searchVals").custom((val, { req }) =>
    (val || "").split(",").length > 1 || (val && !req.query?.search)
      ? Promise.reject("Bad request searchVals")
      : true
  ),

  check("search").custom((val, { req }) =>
    !REG_SEARCH.test(val) ||
    (val && !req.query?.searchVals) ||
    (["id", "restaurantId"].includes(req.query?.searchVals) &&
      !REG_MONGO.test(val))
      ? Promise.reject("Bad request search")
      : true
  ),

  check().custom((_, { req }) =>
    Object.entries(req?.query ?? {}).some(
      ([key, val]) => key.includes("Sort") && !["asc", "desc"].includes(val)
    )
      ? Promise.reject("Bad request sort / numeric")
      : true
  ),

  handleValidator(400),
];
