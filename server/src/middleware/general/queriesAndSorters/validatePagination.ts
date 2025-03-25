import { check } from "express-validator";

export const validatePagination = [
  check("page").toInt().isInt().withMessage("invalid page"),
  check("limit").toInt().isInt().withMessage("invalid limit"),
];
