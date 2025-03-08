"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorDeleteAccount = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorDeleteAccount = [
    (0, express_validator_1.body)("manageAccountToken").matches(regex_1.REG_TOKEN).withMessage("Invalid token"),
    (0, handleValidator_1.handleValidator)(401),
];
