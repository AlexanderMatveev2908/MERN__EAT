"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyChangeEmail = exports.changeEmail = void 0;
const User_1 = __importDefault(require("../../models/User"));
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const token_1 = require("../../utils/token");
const mail_1 = require("../../utils/mail");
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId } = req;
    const { newEmail, manageAccountToken } = req.body;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (user.email === newEmail)
        return (0, baseErrResponse_1.badRequest)(res);
    if (!((_a = user.tokens.manageAccount) === null || _a === void 0 ? void 0 : _a.hashed))
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Verification token not emitted");
    const isMatch = (0, token_1.checkTokenSHA)(manageAccountToken, user.tokens.manageAccount.hashed, "manageAccount");
    const isExpired = new Date((_c = (_b = user.tokens.manageAccount) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    if (!isMatch || isExpired) {
        user.tokens.manageAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return (0, baseErrResponse_1.baseErrResponse)(res, 401, !isMatch ? "Invalid token" : "Expired token");
    }
    const { token, hashedToken, expiryVerification: expiryVerification, } = (0, token_1.genTokenSHA)("verifyNewEmail");
    user.tokens.verifyNewEmail = {
        hashed: hashedToken,
        expiry: expiryVerification,
    };
    user.tempNewEmail = newEmail;
    yield user.save();
    yield (0, mail_1.sendEmailChangeAccountEmail)(user, token);
    return res.status(200).json({
        success: true,
        msg: "Email sent successfully",
    });
});
exports.changeEmail = changeEmail;
const verifyChangeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId, token } = req.body;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!((_a = user.tokens.verifyNewEmail) === null || _a === void 0 ? void 0 : _a.hashed))
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Verification token not emitted");
    const isMatch = (0, token_1.checkTokenSHA)(token, user.tokens.verifyNewEmail.hashed, "verifyNewEmail");
    const isExpired = new Date((_c = (_b = user.tokens.verifyNewEmail) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    if (!isMatch || isExpired) {
        user.tokens.verifyNewEmail = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return (0, baseErrResponse_1.baseErrResponse)(res, 401, !isMatch ? "Invalid token" : "Expired token");
    }
    user.email = user.tempNewEmail;
    user.tempNewEmail = null;
    user.tokens.verifyNewEmail = {
        hashed: null,
        expiry: null,
    };
    yield user.save();
    return res.status(200).json({
        success: true,
        msg: "Email changed successfully",
    });
});
exports.verifyChangeEmail = verifyChangeEmail;
