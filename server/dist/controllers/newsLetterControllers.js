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
exports.sendEmailUnsubscribeRetry = exports.unsubScribeNewsLetterViaEmailLinkNonLogged = exports.unsubScribeNewsLetterViaEmailLinkLogged = exports.subscribeNonLoggedUser = exports.toggleUserNewsLetter = void 0;
const User_1 = __importDefault(require("../models/User"));
const token_1 = require("../utils/token");
const UserNewsLetter_1 = __importDefault(require("../models/UserNewsLetter"));
const baseErrResponse_1 = require("../utils/baseErrResponse");
const mail_1 = require("../utils/mail");
const toggleUserNewsLetter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { type } = req.body;
    const { token, hashedToken, expiryVerification } = (0, token_1.genTokenSHA)("newsletter");
    const updatedUser = yield User_1.default.findByIdAndUpdate(userId, {
        $set: {
            hasSubscribedToNewsletter: type === "subscribe",
            "tokens.unSubScribeNewsLetter.hashed": hashedToken,
            "tokens.unSubScribeNewsLetter.expiry": expiryVerification,
        },
    }, { new: true, select: "hasSubscribedToNewsletter firstName lastName email" });
    if (!updatedUser)
        return (0, baseErrResponse_1.userNotFound)(res);
    yield (0, mail_1.sendSubScriptionNewsLetterConfirmed)(updatedUser, token, "logged", "subscribe");
    return res.status(200).json({
        msg: "User toggled to newsletter",
        success: true,
        user: updatedUser,
    });
});
exports.toggleUserNewsLetter = toggleUserNewsLetter;
const subscribeNonLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { token, hashedToken, expiryVerification } = (0, token_1.genTokenSHA)("newsletter");
    const existingUser = yield User_1.default.findOne({ email });
    const existingSubscription = yield UserNewsLetter_1.default.findOne({
        email,
    }).lean();
    if (existingUser) {
        if (existingUser.hasSubscribedToNewsletter) {
            return (0, baseErrResponse_1.baseErrResponse)(res, 409, "User already subscribed");
        }
        else {
            existingUser.hasSubscribedToNewsletter = true;
            existingUser.tokens.unSubScribeNewsLetter = {
                hashed: hashedToken,
                expiry: expiryVerification,
            };
            yield existingUser.save();
            yield (0, mail_1.sendSubScriptionNewsLetterConfirmed)(existingUser, token, "logged", "subscribe");
            return res.status(200).json({
                msg: "User subscribed to newsletter",
                success: true,
            });
        }
    }
    else if (existingSubscription) {
        return (0, baseErrResponse_1.baseErrResponse)(res, 409, "User already subscribed");
    }
    const newUser = yield UserNewsLetter_1.default.create({
        email,
        hashedTokenToUnsubscribe: hashedToken,
        tokenExpiry: expiryVerification,
    });
    yield (0, mail_1.sendSubScriptionNewsLetterConfirmed)(newUser, token, "non-logged", "subscribe");
    return res.status(201).json({
        msg: "User subscribed to newsletter",
        success: true,
    });
});
exports.subscribeNonLoggedUser = subscribeNonLoggedUser;
const unsubScribeNewsLetterViaEmailLinkLogged = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { userId, token } = req.body;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!user.hasSubscribedToNewsletter)
        return (0, baseErrResponse_1.baseErrResponse)(res, 403, "User not subscribed to newsletter");
    if (!((_a = user.tokens.unSubScribeNewsLetter) === null || _a === void 0 ? void 0 : _a.hashed))
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Verification token not emitted");
    const isExpired = new Date((_c = (_b = user.tokens.unSubScribeNewsLetter) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() <
        Date.now();
    const isMatch = (0, token_1.checkTokenSHA)(token, (_e = (_d = user.tokens.unSubScribeNewsLetter) === null || _d === void 0 ? void 0 : _d.hashed) !== null && _e !== void 0 ? _e : "", "newsletter");
    if (isExpired || !isMatch) {
        user.tokens.unSubScribeNewsLetter = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return (0, baseErrResponse_1.unauthorizedErr)(res, isExpired ? "Token Expired" : "Invalid Token");
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
exports.unsubScribeNewsLetterViaEmailLinkLogged = unsubScribeNewsLetterViaEmailLinkLogged;
const unsubScribeNewsLetterViaEmailLinkNonLogged = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { token, userId } = req.body;
    const user = yield UserNewsLetter_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!(user === null || user === void 0 ? void 0 : user.hashedTokenToUnsubscribe))
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Verification token not emitted");
    const isMatch = (0, token_1.checkTokenSHA)(token, user.hashedTokenToUnsubscribe, "newsletter");
    const isExpired = new Date((_a = user === null || user === void 0 ? void 0 : user.tokenExpiry) !== null && _a !== void 0 ? _a : 0).getTime() < Date.now();
    if (!isMatch || isExpired) {
        user.tokenExpiry = null;
        user.hashedTokenToUnsubscribe = null;
        yield user.save();
        return (0, baseErrResponse_1.unauthorizedErr)(res, isExpired ? "Token Expired" : "Invalid Token");
    }
    const result = yield UserNewsLetter_1.default.deleteOne({ email: user.email });
    if ((result === null || result === void 0 ? void 0 : result.deletedCount) !== 1)
        return (0, baseErrResponse_1.userNotFound)(res);
    else
        return res
            .status(200)
            .json({ msg: "User unsubscribed to newsletter", success: true });
});
exports.unsubScribeNewsLetterViaEmailLinkNonLogged = unsubScribeNewsLetterViaEmailLinkNonLogged;
const sendEmailUnsubscribeRetry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { token, hashedToken, expiryVerification } = (0, token_1.genTokenSHA)("newsletter");
    const existingNonLoggedUser = yield UserNewsLetter_1.default.findOne({
        email,
    });
    if (!existingNonLoggedUser) {
        const loggedUser = yield User_1.default.findOne({ email });
        if (!loggedUser)
            (0, baseErrResponse_1.userNotFound)(res);
        if (!(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.hasSubscribedToNewsletter))
            return (0, baseErrResponse_1.baseErrResponse)(res, 403, "User not subscribed");
        loggedUser.tokens.unSubScribeNewsLetter = {
            hashed: hashedToken,
            expiry: expiryVerification,
        };
        yield loggedUser.save();
        yield (0, mail_1.sendSubScriptionNewsLetterConfirmed)(loggedUser, token, "logged", "unsubscribe");
        return res.status(200).json({
            msg: "Email sent to unsubscribe",
            success: true,
        });
    }
    else {
        existingNonLoggedUser.hashedTokenToUnsubscribe = hashedToken;
        existingNonLoggedUser.tokenExpiry = expiryVerification;
        yield existingNonLoggedUser.save();
        yield (0, mail_1.sendSubScriptionNewsLetterConfirmed)(existingNonLoggedUser, token, "non-logged", "unsubscribe");
        return res.status(200).json({
            msg: "Email sent to unsubscribe",
            success: true,
        });
    }
});
exports.sendEmailUnsubscribeRetry = sendEmailUnsubscribeRetry;
