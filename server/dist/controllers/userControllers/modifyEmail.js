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
import { badRequest, baseErrResponse, unauthorizedErr, userNotFound, } from "../../utils/baseErrResponse.js";
import { checkTokenSHA, genTokenSHA } from "../../utils/token.js";
import { sendEmailChangeAccountEmail } from "../../utils/mail.js";
import Restaurant from "../../models/Restaurant.js";
export const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId } = req;
    const { newEmail, manageAccountToken } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    const existingUser = yield User.findOne({ email: newEmail });
    if (existingUser)
        return baseErrResponse(res, 400, "Email already in use");
    if (user.email === newEmail)
        return badRequest(res);
    if (!((_a = user.tokens.manageAccount) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isMatch = checkTokenSHA(manageAccountToken, user.tokens.manageAccount.hashed, "manageAccount");
    const isExpired = new Date((_c = (_b = user.tokens.manageAccount) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    if (!isMatch || isExpired) {
        user.tokens.manageAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return baseErrResponse(res, 401, !isMatch ? "Invalid token" : "Expired token");
    }
    const { token, hashedToken, expiryVerification: expiryVerification, } = genTokenSHA("verifyNewEmail");
    user.tokens.verifyNewEmail = {
        hashed: hashedToken,
        expiry: expiryVerification,
    };
    user.tempNewEmail = newEmail;
    yield user.save();
    yield sendEmailChangeAccountEmail(user, token);
    return res.status(200).json({
        success: true,
        msg: "Email sent successfully",
    });
});
export const verifyChangeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId, token } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!((_a = user.tokens.verifyNewEmail) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isMatch = checkTokenSHA(token, user.tokens.verifyNewEmail.hashed, "verifyNewEmail");
    const isExpired = new Date((_c = (_b = user.tokens.verifyNewEmail) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    if (!isMatch || isExpired) {
        user.tokens.verifyNewEmail = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return baseErrResponse(res, 401, !isMatch ? "Invalid token" : "Expired token");
    }
    const restaurants = yield Restaurant.find({
        owner: user._id,
        "contact.email": user.email,
    });
    if (restaurants.length) {
        const promises = restaurants.map((el) => __awaiter(void 0, void 0, void 0, function* () {
            el.contact.email = user.tempNewEmail;
            yield el.save();
        }));
        yield Promise.all(promises);
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
