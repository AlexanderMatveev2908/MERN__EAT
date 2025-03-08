"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorSendEmail = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorSendEmail = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid email")
        .matches(regex_1.REG_EMAIL)
        .withMessage("Invalid format"),
    (0, express_validator_1.check)("type").custom((val) => ["verify-account", "recover-pwd"].includes(val)
        ? true
        : Promise.reject("Invalid type")),
    (0, handleValidator_1.handleValidator)(400),
];
