import { check } from "express-validator";
import { REG_TITLE_REV, REG_TXT_REV } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateReview = [
  check().custom((_, { req }) => {
    return true;
  }),

  check("title").matches(REG_TITLE_REV).withMessage("Invalid title"),
  check("rating")
    .toInt()
    .isInt({ min: 1, max: 5 })
    .withMessage("Invalid rating"),
  check("comment").custom((val) =>
    val && !REG_TXT_REV.test(val) ? Promise.reject("Invalid comment") : true
  ),
  check().custom((_, { req }) => {
    if (req.files?.length && req.files?.length > 5)
      throw new Error("Too many images");

    if (JSON.parse(req.body.images ?? "[]").length > 5)
      throw new Error("Too many images");
    return true;
  }),

  handleValidator(400),
];
