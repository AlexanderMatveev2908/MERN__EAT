"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRecoverPwd = void 0;
const express_validator_1 = require("express-validator");
const handleValidator_1 = require("../../utils/handleValidator");
const regex_1 = require("../../constants/regex");
exports.validatorRecoverPwd = [
    (0, express_validator_1.body)("userId").matches(regex_1.REG_MONGO).withMessage("invalid id"),
    (0, express_validator_1.body)("token").matches(regex_1.REG_TOKEN).withMessage("invalid token"),
    (0, handleValidator_1.handleValidator)(401),
    (0, express_validator_1.body)("password").matches(regex_1.REG_PWD).withMessage("invalid password"),
    (0, handleValidator_1.handleValidator)(400),
];
