import { body } from "express-validator";
import { REG_EMAIL, REG_NAME, REG_PWD } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorRegister = [
    body("firstName").matches(REG_NAME).withMessage("Invalid First Name"),
    body("lastName").matches(REG_NAME).withMessage("Invalid Last Name"),
    body("email")
        .isEmail()
        .withMessage("Invalid Email")
        .matches(REG_EMAIL)
        .withMessage("Invalid Email format"),
    body("password")
        .matches(REG_PWD)
        .withMessage("Invalid password")
        .custom((pwd, { req }) => {
        if (pwd === req.body.email)
            throw new Error("password can not be the same as email");
        return true;
    }),
    body("acceptedTerms")
        .equals("true")
        .withMessage("Terms Accepted needed to proceed"),
    handleValidator(400),
];
