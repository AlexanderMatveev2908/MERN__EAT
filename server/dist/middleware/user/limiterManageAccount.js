"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageAccountLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.manageAccountLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
        success: false,
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => { var _a; return (_a = req.ip) !== null && _a !== void 0 ? _a : "unknown-ip"; },
    handler: (req, res, next) => {
        res.clearCookie("refreshToken");
        return res.status(429).json({
            msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
            success: false,
        });
    },
});
