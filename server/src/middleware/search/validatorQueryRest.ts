import { check } from "express-validator";
import { REG_SEARCH } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

const areValidStr = (q: any) =>
  Object.entries(q ?? {})
    .filter(([k, _]) => ["name", "state", "country", "city"].includes(k))
    .every(([_, v]) => REG_SEARCH.test(v as string));

export const validatorQueryRest = [
  check().custom((_, { req }) => {
    const q = req.query;

    if (!areValidStr(q)) throw new Error("Invalid query");

    if (
      Object.entries(q ?? {}).some(
        ([k, v]) => k.includes("Sort") && !["asc", "desc"].includes(v)
      )
    )
      throw new Error("Invalid query");

    return true;
  }),

  handleValidator(400),
];
