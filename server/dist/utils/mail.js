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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailChangeAccountEmail = exports.sendSubScriptionNewsLetterConfirmed = exports.sendUserEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
const basePath = process.env.NODE_ENV === "development"
    ? process.env.FRONT_URL_DEV
    : process.env.FRONT_URL;
const sendUserEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, token, type, }) {
    if ([user, token, type].some((el) => !el))
        return;
    const verificationURL = `${basePath}/auth/verify?token=${token}&userId=${user === null || user === void 0 ? void 0 : user._id}&type=${type}`;
    yield nodemailer_1.transporterMail.sendMail({
        from: process.env.MAIL_USER,
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: type === "verify-account" ? "VERIFY ACCOUNT" : "RECOVER PASSWORD",
        text: `Click the link to be redirected to our app and ${type === "verify-account"
            ? "verify your account"
            : "recover your password"} ✌🏼: ${verificationURL}`,
    });
});
exports.sendUserEmail = sendUserEmail;
const SUB_CONFIRM_NEWSLETTER = "SUBSCRIPTION TO NEWSLETTER";
const SUB_UNSUBSCRIBE_NEWSLETTER = "UNSUBSCRIBE NEWSLETTER";
const TXT_CONFIRM_NEWSLETTER = (URL) => `Congrats on subscribing to our newsletter 🎉\nWe will keep you update on our sales and send you unique coupon discount ✌🏼\nIf for any reason you want to unsubscribe, don't worry, you only have to click the following link: ${URL}`;
const TXT_UNSUBSCRIBE_NEWSLETTER = (URL) => `Clicking the following link you will be redirected on our page and your subscription will be deleted, if you accidentally ask to unsubscribe you can ignore the email\n
Unsubscribe: ${URL}`;
const sendSubScriptionNewsLetterConfirmed = (user, token, typeUser, action) => __awaiter(void 0, void 0, void 0, function* () {
    if ([user, token].some((el) => !el))
        return;
    const unsubscribeURL = `${basePath}/newsletter/verify-unsubscribe?userId=${user === null || user === void 0 ? void 0 : user._id}&token=${token}&typeUser=${typeUser}`;
    yield nodemailer_1.transporterMail.sendMail({
        from: process.env.MAIL_USER,
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: action === "subscribe"
            ? SUB_CONFIRM_NEWSLETTER
            : SUB_UNSUBSCRIBE_NEWSLETTER,
        text: action === "subscribe"
            ? TXT_CONFIRM_NEWSLETTER(unsubscribeURL)
            : TXT_UNSUBSCRIBE_NEWSLETTER(unsubscribeURL),
    });
});
exports.sendSubScriptionNewsLetterConfirmed = sendSubScriptionNewsLetterConfirmed;
const sendEmailChangeAccountEmail = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!token || !((_a = Object.keys(user !== null && user !== void 0 ? user : {})) === null || _a === void 0 ? void 0 : _a.length))
        return;
    const verifyEmailURL = `${basePath}/verify-new-email?userId=${user._id}&token=${token}`;
    yield nodemailer_1.transporterMail.sendMail({
        from: process.env.MAIL_USER,
        to: user === null || user === void 0 ? void 0 : user.tempNewEmail,
        subject: "VERIFY NEW EMAIL",
        text: `Click the link to be redirected to our app and verify your new email ✌🏼: ${verifyEmailURL}`,
    });
});
exports.sendEmailChangeAccountEmail = sendEmailChangeAccountEmail;
