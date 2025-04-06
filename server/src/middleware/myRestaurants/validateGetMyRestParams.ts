import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
import { REG_MONGO, REG_SEARCH } from "../../config/constants/regex.js";
import { validatePagination } from "../general/queriesAndSorters/validatePagination.js";

export const validateGetMyRestParams = [
  ...validatePagination,

  check("searchVals").custom((val, { req }) =>
    val?.split(",").length > 1 || (val && !req?.query?.search)
      ? Promise.reject("Bad request")
      : true
  ),
  check("search").custom((val, { req }) =>
    !REG_SEARCH.test(val) ||
    (val && !req?.query?.searchVals) ||
    (req.query?.searchVals === "id" && !REG_MONGO.test(val))
      ? Promise.reject("Bad request")
      : true
  ),

  check().custom((_, { req }) => {
    if (
      Object.entries(req?.query ?? {}).some(
        ([key, val]) => key.includes("Sort") && !["asc", "desc"].includes(val)
      )
    )
      throw new Error("Bad request");

    return true;
  }),

  handleValidator(400),
];
