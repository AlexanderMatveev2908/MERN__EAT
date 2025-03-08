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
exports.recoverPwd = void 0;
const User_1 = __importDefault(require("../../models/User"));
const token_1 = require("../../utils/token");
const hashPwd_1 = require("../../utils/hashPwd");
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const recoverPwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId, password, token } = req.body;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!user.isVerified)
        return (0, baseErrResponse_1.baseErrResponse)(res, 403, "User not verified");
    if (!((_a = user.tokens.recoverPwd) === null || _a === void 0 ? void 0 : _a.hashed))
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Verification token not emitted");
    const isExpired = ((_d = new Date((_c = (_b = user.tokens.recoverPwd) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0)) === null || _d === void 0 ? void 0 : _d.getTime()) < Date.now();
    const isMatch = (0, token_1.checkTokenSHA)(token, (_f = (_e = user.tokens.recoverPwd) === null || _e === void 0 ? void 0 : _e.hashed) !== null && _f !== void 0 ? _f : "", "auth");
    if (isExpired || !isMatch) {
        user.tokens.recoverPwd = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return (0, baseErrResponse_1.unauthorizedErr)(res, isExpired ? "Token expired" : "Invalid token");
    }
    if (password === user.email)
        return (0, baseErrResponse_1.baseErrResponse)(res, 400, "Password can not be same as email");
    const isSamePwd = yield (0, hashPwd_1.checkPwdBcrypt)(password, user.password);
    if (isSamePwd)
        return (0, baseErrResponse_1.baseErrResponse)(res, 400, "New Password must be different from old one");
    const hashedPwd = yield (0, hashPwd_1.hashPwdBcrypt)(password);
    user.password = hashedPwd;
    user.tokens.recoverPwd = {
        hashed: null,
        expiry: null,
    };
    const accessToken = (0, token_1.genAccessJWT)(user._id);
    const { jwe, expiry } = yield (0, token_1.genTokenJWE)(user._id);
    user.tokens.refresh = {
        hashed: jwe,
        expiry: expiry,
    };
    yield user.save();
    res.cookie("refreshToken", jwe, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiry,
    });
    return res
        .status(200)
        .json({ accessToken, success: true, userEmail: user.email });
});
exports.recoverPwd = recoverPwd;
