import { body } from "express-validator";
import { REG_EMAIL } from "../../constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorNewsLetterEmail = [
    body("email")
        .isEmail()
        .withMessage("Invalid email")
        .matches(REG_EMAIL)
        .withMessage("Invalid format"),
    handleValidator(400),
];
