var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import { checkTokenSHA, genTokenSHA } from "../utils/token.js";
import NonLoggedUserNewsLetter from "../models/UserNewsLetter.js";
import { baseErrResponse, unauthorizedErr, userNotFound, } from "../utils/baseErrResponse.js";
import { sendSubScriptionNewsLetterConfirmed } from "../utils/mail.js";
export const toggleUserNewsLetter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { type } = req.body;
    const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");
    const updatedUser = yield User.findByIdAndUpdate(userId, {
        $set: {
            hasSubscribedToNewsletter: type === "subscribe",
            "tokens.unSubScribeNewsLetter.hashed": hashedToken,
            "tokens.unSubScribeNewsLetter.expiry": expiryVerification,
        },
    }, { new: true, select: "hasSubscribedToNewsletter firstName lastName email" });
    if (!updatedUser)
        return userNotFound(res);
    yield sendSubScriptionNewsLetterConfirmed(updatedUser, token, "logged", "subscribe");
    return res.status(200).json({
        msg: "User toggled to newsletter",
        success: true,
        user: updatedUser,
    });
});
export const subscribeNonLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");
    const existingUser = yield User.findOne({ email });
    const existingSubscription = yield NonLoggedUserNewsLetter.findOne({
        email,
    }).lean();
    if (existingUser) {
        if (existingUser.hasSubscribedToNewsletter) {
            return baseErrResponse(res, 409, "User already subscribed");
        }
        else {
            existingUser.hasSubscribedToNewsletter = true;
            existingUser.tokens.unSubScribeNewsLetter = {
                hashed: hashedToken,
                expiry: expiryVerification,
            };
            yield existingUser.save();
            yield sendSubScriptionNewsLetterConfirmed(existingUser, token, "logged", "subscribe");
            return res.status(200).json({
                msg: "User subscribed to newsletter",
                success: true,
            });
        }
    }
    else if (existingSubscription) {
        return baseErrResponse(res, 409, "User already subscribed");
    }
    const newUser = yield NonLoggedUserNewsLetter.create({
        email,
        hashedTokenToUnsubscribe: hashedToken,
        tokenExpiry: expiryVerification,
    });
    yield sendSubScriptionNewsLetterConfirmed(newUser, token, "non-logged", "subscribe");
    return res.status(201).json({
        msg: "User subscribed to newsletter",
        success: true,
    });
});
export const unsubScribeNewsLetterViaEmailLinkLogged = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { userId, token } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!user.hasSubscribedToNewsletter)
        return baseErrResponse(res, 403, "User not subscribed to newsletter");
    if (!((_a = user.tokens.unSubScribeNewsLetter) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isExpired = new Date((_c = (_b = user.tokens.unSubScribeNewsLetter) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() <
        Date.now();
    const isMatch = checkTokenSHA(token, (_e = (_d = user.tokens.unSubScribeNewsLetter) === null || _d === void 0 ? void 0 : _d.hashed) !== null && _e !== void 0 ? _e : "", "newsletter");
    if (isExpired || !isMatch) {
        user.tokens.unSubScribeNewsLetter = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, isExpired ? "Token Expired" : "Invalid Token");
    }
    user.hasSubscribedToNewsletter = false;
    user.tokens.unSubScribeNewsLetter = {
        hashed: null,
        expiry: null,
    };
    yield user.save();
    return res.status(200).json({
        msg: "User unsubscribed to newsletter",
        success: true,
    });
});
export const unsubScribeNewsLetterViaEmailLinkNonLogged = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { token, userId } = req.body;
    const user = yield NonLoggedUserNewsLetter.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!(user === null || user === void 0 ? void 0 : user.hashedTokenToUnsubscribe))
        return unauthorizedErr(res, "Verification token not emitted");
    const isMatch = checkTokenSHA(token, user.hashedTokenToUnsubscribe, "newsletter");
    const isExpired = new Date((_a = user === null || user === void 0 ? void 0 : user.tokenExpiry) !== null && _a !== void 0 ? _a : 0).getTime() < Date.now();
    if (!isMatch || isExpired) {
        user.tokenExpiry = null;
        user.hashedTokenToUnsubscribe = null;
        yield user.save();
        return unauthorizedErr(res, isExpired ? "Token Expired" : "Invalid Token");
    }
    const result = yield NonLoggedUserNewsLetter.deleteOne({ email: user.email });
    if ((result === null || result === void 0 ? void 0 : result.deletedCount) !== 1)
        return userNotFound(res);
    else
        return res
            .status(200)
            .json({ msg: "User unsubscribed to newsletter", success: true });
});
export const sendEmailUnsubscribeRetry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");
    const existingNonLoggedUser = yield NonLoggedUserNewsLetter.findOne({
        email,
    });
    if (!existingNonLoggedUser) {
        const loggedUser = yield User.findOne({ email });
        if (!loggedUser)
            userNotFound(res);
        if (!(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.hasSubscribedToNewsletter))
            return baseErrResponse(res, 403, "User not subscribed");
        loggedUser.tokens.unSubScribeNewsLetter = {
            hashed: hashedToken,
            expiry: expiryVerification,
        };
        yield loggedUser.save();
        yield sendSubScriptionNewsLetterConfirmed(loggedUser, token, "logged", "unsubscribe");
        return res.status(200).json({
            msg: "Email sent to unsubscribe",
            success: true,
        });
    }
    else {
        existingNonLoggedUser.hashedTokenToUnsubscribe = hashedToken;
        existingNonLoggedUser.tokenExpiry = expiryVerification;
        yield existingNonLoggedUser.save();
        yield sendSubScriptionNewsLetterConfirmed(existingNonLoggedUser, token, "non-logged", "unsubscribe");
        return res.status(200).json({
            msg: "Email sent to unsubscribe",
            success: true,
        });
    }
});
