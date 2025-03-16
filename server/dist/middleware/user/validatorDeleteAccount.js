import { body } from "express-validator";
import { REG_TOKEN } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorDeleteAccount = [
    body("manageAccountToken").matches(REG_TOKEN).withMessage("Invalid token"),
    handleValidator(401),
];
