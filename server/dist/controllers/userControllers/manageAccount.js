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
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse.js";
import { checkPwdBcrypt } from "../../utils/hashPwd.js";
import { genTokenSHA } from "../../utils/token.js";
export const getRightManageAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { password } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    const isMatch = yield checkPwdBcrypt(password, user.password);
    if (!isMatch)
        return unauthorizedErr(res, "Invalid password");
    const { token, hashedToken, expiryVerification } = genTokenSHA("manageAccount");
    user.tokens.manageAccount = {
        hashed: hashedToken,
        expiry: expiryVerification,
    };
    yield user.save();
    return res.status(200).json({
        success: true,
        manageAccountToken: token,
    });
});
