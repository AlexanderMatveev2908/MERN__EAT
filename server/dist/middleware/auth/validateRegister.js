"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRegister = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorRegister = [
    (0, express_validator_1.body)("firstName").matches(regex_1.REG_NAME).withMessage("Invalid First Name"),
    (0, express_validator_1.body)("lastName").matches(regex_1.REG_NAME).withMessage("Invalid Last Name"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid Email")
        .matches(regex_1.REG_EMAIL)
        .withMessage("Invalid Email format"),
    (0, express_validator_1.body)("password")
        .matches(regex_1.REG_PWD)
        .withMessage("Invalid password")
        .custom((pwd, { req }) => {
        if (pwd === req.body.email)
            throw new Error("password can not be the same as email");
        return true;
    }),
    (0, express_validator_1.body)("acceptedTerms")
        .equals("true")
        .withMessage("Terms Accepted needed to proceed"),
    (0, handleValidator_1.handleValidator)(400),
];
