"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorProfileDetails = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorProfileDetails = [
    (0, express_validator_1.body)("firstName").matches(regex_1.REG_NAME).withMessage("invalid first name"),
    (0, express_validator_1.body)("lastName").matches(regex_1.REG_NAME).withMessage("invalid last name"),
    (0, express_validator_1.body)("country").matches(regex_1.REG_COUNTRY).withMessage("invalid country"),
    (0, express_validator_1.body)("state").matches(regex_1.REG_STATE).withMessage("invalid state"),
    (0, express_validator_1.body)("city").matches(regex_1.REG_CITY).withMessage("invalid city"),
    (0, express_validator_1.body)("street").matches(regex_1.REG_STREET).withMessage("invalid street"),
    (0, express_validator_1.body)("zipCode").matches(regex_1.REG_ZIP).withMessage("invalid zip"),
    (0, express_validator_1.body)("phone").matches(regex_1.REG_PHONE).withMessage("invalid phone"),
    (0, handleValidator_1.handleValidator)(400),
];
