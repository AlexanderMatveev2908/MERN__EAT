"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorVerifyNewEmail = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorVerifyNewEmail = [
    (0, express_validator_1.body)("token").matches(regex_1.REG_TOKEN).withMessage("Invalid token"),
    (0, express_validator_1.body)("userId").isMongoId().withMessage("Invalid userId"),
    (0, handleValidator_1.handleValidator)(401),
];
