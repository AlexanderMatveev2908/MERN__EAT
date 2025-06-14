import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatePagination = [
    check("page").toInt().isInt().withMessage("invalid page"),
    check("limit").toInt().isInt().withMessage("invalid limit"),
    handleValidator(400),
];
