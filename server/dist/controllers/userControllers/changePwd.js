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
import { baseErrResponse, unauthorizedErr, userNotFound, } from "../../utils/baseErrResponse.js";
import { checkTokenSHA } from "../../utils/token.js";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd.js";
export const changeOldPwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId } = req;
    const { newPassword, manageAccountToken } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!((_a = user.tokens.manageAccount) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isExpired = new Date((_c = (_b = user.tokens.manageAccount) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    const isMatch = checkTokenSHA(manageAccountToken, user.tokens.manageAccount.hashed, "manageAccount");
    if (!isMatch || isExpired) {
        user.tokens.manageAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, isExpired ? "Token expired" : "Token invalid");
    }
    const isSamePwd = yield checkPwdBcrypt(newPassword, user.password);
    if (isSamePwd)
        return baseErrResponse(res, 400, "New password can not be the same as the old one");
    if ([user.email, user === null || user === void 0 ? void 0 : user.tempEmail].some((el) => el === newPassword))
        return baseErrResponse(res, 400, "Password can not be the same as your email");
    const hashedPwd = yield hashPwdBcrypt(newPassword);
    user.tokens.manageAccount = {
        hashed: null,
        expiry: null,
    };
    user.password = hashedPwd;
    yield user.save();
    return res.status(200).json({
        success: true,
        msg: "Password changed successfully",
    });
});
