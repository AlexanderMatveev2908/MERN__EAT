import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateGetMyRestParams = [
  check("searchVals").custom((val, { req }) =>
    val?.split(",").length > 1 || (val && !req?.query?.search)
      ? Promise.reject("Bad request")
      : true
  ),
  check("search").custom((val, { req }) =>
    val && !req?.query?.searchVals ? Promise.reject("Bad request") : true
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
