import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
export const checkRestId = [
    check("restId").isMongoId().withMessage("Invalid id"),
    handleValidator(400),
];
