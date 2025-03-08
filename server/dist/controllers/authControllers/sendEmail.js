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
exports.sendEmailUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const token_1 = require("../../utils/token");
const mail_1 = require("../../utils/mail");
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const sendEmailUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { type } = req.query;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!user.isVerified && type === "recover-pwd")
        return (0, baseErrResponse_1.baseErrResponse)(res, 403, "User not verified");
    if (user.isVerified && type === "verify-account")
        return (0, baseErrResponse_1.baseErrResponse)(res, 409, "User already verified");
    const { token, hashedToken, expiryVerification } = (0, token_1.genTokenSHA)("auth");
    if (type === "verify-account") {
        user.tokens.verifyAccount = {
            hashed: hashedToken,
            expiry: expiryVerification,
        };
    }
    else if (type === "recover-pwd") {
        user.tokens.recoverPwd = {
            hashed: hashedToken,
            expiry: expiryVerification,
        };
    }
    yield user.save();
    const filteredUser = {
        _id: user._id,
        email: user.email,
    };
    yield (0, mail_1.sendUserEmail)({
        user: filteredUser,
        token,
        type: type,
    });
    return res.status(200).json({ msg: "Email sent successfully" });
});
exports.sendEmailUser = sendEmailUser;
