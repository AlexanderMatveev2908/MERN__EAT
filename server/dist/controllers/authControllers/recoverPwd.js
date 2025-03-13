var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/User.js";
import { checkTokenSHA, genAccessJWT, genTokenJWE } from "../../utils/token.js";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd.js";
import { baseErrResponse, unauthorizedErr, userNotFound, } from "../../utils/baseErrResponse.js";
import { isDev } from "../../config/currMode.js";
export const recoverPwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId, password, token } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!user.isVerified)
        return baseErrResponse(res, 403, "User not verified");
    if (!((_a = user.tokens.recoverPwd) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isExpired = ((_d = new Date((_c = (_b = user.tokens.recoverPwd) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0)) === null || _d === void 0 ? void 0 : _d.getTime()) < Date.now();
    const isMatch = checkTokenSHA(token, (_f = (_e = user.tokens.recoverPwd) === null || _e === void 0 ? void 0 : _e.hashed) !== null && _f !== void 0 ? _f : "", "auth");
    if (isExpired || !isMatch) {
        user.tokens.recoverPwd = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, isExpired ? "Token expired" : "Invalid token");
    }
    if (password === user.email)
        return baseErrResponse(res, 400, "Password can not be same as email");
    const isSamePwd = yield checkPwdBcrypt(password, user.password);
    if (isSamePwd)
        return baseErrResponse(res, 400, "New Password must be different from old one");
    const hashedPwd = yield hashPwdBcrypt(password);
    user.password = hashedPwd;
    user.tokens.recoverPwd = {
        hashed: null,
        expiry: null,
    };
    const accessToken = genAccessJWT(user._id);
    const { jwe, expiry } = yield genTokenJWE(user._id);
    user.tokens.refresh = {
        hashed: jwe,
        expiry: expiry,
    };
    yield user.save();
    res.cookie("refreshToken", jwe, {
        httpOnly: true,
        secure: isDev,
        expires: expiry,
    });
    return res
        .status(200)
        .json({ accessToken, success: true, userEmail: user.email });
});
