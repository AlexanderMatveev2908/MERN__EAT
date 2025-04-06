import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
export const validateParams = [
    check("dishId").isMongoId().withMessage("Invalid dish ID"),
    handleValidator(400),
];
