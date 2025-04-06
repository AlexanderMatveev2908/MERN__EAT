import { check } from "express-validator";
import { REG_MONGO, REG_SEARCH } from "../../../config/constants/regex.js";

export const validateSearch = [
  check("searchVals").custom((val, { req }) =>
    val?.split(",").length > 1 || (val && !req?.query?.search)
      ? Promise.reject("Bad request")
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
];
