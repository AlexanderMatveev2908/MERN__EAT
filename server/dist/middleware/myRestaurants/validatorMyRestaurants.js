"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMyRestaurants = exports.validateFiles = void 0;
const express_validator_1 = require("express-validator");
const regex_1 = require("../../constants/regex");
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const handleValidator_1 = require("../../utils/handleValidator");
const validateFiles = (req, res, next) => {
    if (!req.files)
        return (0, baseErrResponse_1.badRequest)(res);
    return next();
};
exports.validateFiles = validateFiles;
exports.validatorMyRestaurants = [
    (0, express_validator_1.body)("name").matches(regex_1.REG_RESTAURANT_NAME).withMessage("Invalid name format"),
    (0, express_validator_1.body)("country").matches(regex_1.REG_COUNTRY).withMessage("Invalid country format"),
    (0, express_validator_1.body)("state").matches(regex_1.REG_STATE).withMessage("Invalid state format"),
    (0, express_validator_1.body)("city").matches(regex_1.REG_CITY).withMessage("Invalid city format"),
    (0, express_validator_1.body)("street").matches(regex_1.REG_STREET).withMessage("Invalid street format"),
    (0, express_validator_1.body)("zipCode").matches(regex_1.REG_ZIP).withMessage("Invalid zip code format"),
    (0, express_validator_1.body)("phone")
        .optional()
        .matches(regex_1.REG_PHONE)
        .withMessage("Invalid phone format"),
    (0, express_validator_1.body)("email")
        .optional()
        .matches(regex_1.REG_EMAIL)
        .withMessage("Invalid email format"),
    (0, express_validator_1.body)("website")
        .optional()
        .matches(regex_1.REG_WEB_URL)
        .withMessage("Invalid website format"),
    (0, express_validator_1.body)("openTime")
        .toInt()
        .isInt({ min: 0, max: 1439 })
        .withMessage("Invalid open time format"),
    (0, express_validator_1.body)("closeTime")
        .toInt()
        .isInt({ min: 0, max: 1439 })
        .withMessage("Invalid close time format"),
    (0, express_validator_1.body)("categories")
        .isArray({ min: 1, max: 3 })
        .withMessage("Invalid categories format"),
    (0, express_validator_1.body)("estTimeDelivery").custom((val, { req }) => {
        const diff = +req.body.closeTime - +req.body.openTime;
        if (diff > 0 && diff < +val)
            throw new Error("Invalid est time delivery format");
        return true;
    }),
    (0, express_validator_1.body)("price")
        .optional()
        .matches(regex_1.REG_PRICE)
        .withMessage("Invalid price format"),
    (0, express_validator_1.body)("freeDeliveryPrice")
        .optional()
        .custom((val, { req }) => {
        if (!req.body.price && val)
            throw new Error("Not possible make free something that already is");
        return true;
    }),
    (0, handleValidator_1.handleValidator)(400),
];
