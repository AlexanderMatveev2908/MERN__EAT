import { check } from "express-validator";
import { REG_SEARCH } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorQueryRest = [
  check().custom((_, { req }) => {
    const q = req.query;

    if ((q?.search && !q?.searchVals) || (!q?.search && q?.searchVals))
      throw new Error("Invalid query");
    if (q?.searchVals?.split(",")?.length > 1) throw new Error("Invalid query");
    if (!REG_SEARCH.test(q?.search)) throw new Error("Invalid query");

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
