import { check } from "express-validator";
import { handleValidator } from "../../../utils/handleValidator.js";

export const validateSorters = [
  check().custom((_, { req }) =>
    Object.entries(req?.query ?? {}).some(
      ([key, val]) => key.includes("Sort") && !["asc", "desc"].includes(val)
    )
      ? Promise.reject("Bad request sort / numeric")
      : true
  ),
];
