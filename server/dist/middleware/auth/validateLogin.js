"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorLogin = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorLogin = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid Email")
        .matches(regex_1.REG_EMAIL)
        .withMessage("Invalid Email format"),
    (0, express_validator_1.body)("password").matches(regex_1.REG_PWD).withMessage("Invalid password"),
    (0, handleValidator_1.handleValidator)(401),
];
