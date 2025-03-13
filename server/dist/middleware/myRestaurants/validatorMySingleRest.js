import { param } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorMySingleRest = [
    param("restId").isMongoId().withMessage("Invalid id"),
    handleValidator(400),
];
