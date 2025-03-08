"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidator = void 0;
const express_validator_1 = require("express-validator");
const handleValidator = (status) => (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        if (status === 400)
            return res
                .status(400)
                .json({ errors: errors.array(), msg: "Bad request" });
        else
            return res.status(401).json({ msg: "Unauthorized" });
    }
    return next();
};
exports.handleValidator = handleValidator;
