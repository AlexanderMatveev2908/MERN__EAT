"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorToggleSubscribe = void 0;
const express_validator_1 = require("express-validator");
const handleValidator_1 = require("../../utils/handleValidator");
exports.validatorToggleSubscribe = [
    (0, express_validator_1.body)("type").isIn(["subscribe", "unsubscribe"]).withMessage("Invalid type"),
    (0, handleValidator_1.handleValidator)(400),
];
