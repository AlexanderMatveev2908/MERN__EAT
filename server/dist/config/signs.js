"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_EXPIRY = exports.GET_SIGN = exports.GEN_EXPIRY_REFRESH = exports.ACCESS_SIGN = exports.EXPIRY_ACCESS = void 0;
const currMode_1 = require("./currMode");
exports.EXPIRY_ACCESS = currMode_1.isDev ? "15m" : "15m"; //basic access token
exports.ACCESS_SIGN = process.env.JWT_ACCESS_SIGN;
const GEN_EXPIRY_AUTH = () => new Date(Date.now() + 1000 * 60 * 15); //verify-email, recover-pwd
const GEN_EXPIRY_NEWSLETTER = () => new Date(Date.now() + 1000 * 60 * 30); // newsletter unsubscribe
const GEN_EXPIRY_MANAGE_ACCOUNT = () => new Date(Date.now() + 1000 * 60 * 15); // manage-account
const GEN_EXPIRY_VERIFY_NEW_EMAIL = () => new Date(Date.now() + 1000 * 60 * 15); // verify-new-email
const GEN_EXPIRY_REFRESH = () => currMode_1.isDev
    ? new Date(Date.now() + 1000 * 60 * 60 * 24) // refresh token for access token
    : new Date(Date.now() + 1000 * 60 * 60 * 24);
exports.GEN_EXPIRY_REFRESH = GEN_EXPIRY_REFRESH;
const GET_SIGN = (type) => type === "auth"
    ? process.env.AUTH_SIGN
    : type === "manageAccount"
        ? process.env.MANAGE_ACCOUNT_SIGN
        : type === "verifyNewEmail"
            ? process.env.VERIFY_NEW_EMAIL_SIGN
            : process.env.NEWSLETTER_SIGN;
exports.GET_SIGN = GET_SIGN;
const GET_EXPIRY = (type) => type === "auth"
    ? GEN_EXPIRY_AUTH()
    : type === "manageAccount"
        ? GEN_EXPIRY_MANAGE_ACCOUNT()
        : type === "verifyNewEmail"
            ? GEN_EXPIRY_VERIFY_NEW_EMAIL()
            : GEN_EXPIRY_NEWSLETTER();
exports.GET_EXPIRY = GET_EXPIRY;
