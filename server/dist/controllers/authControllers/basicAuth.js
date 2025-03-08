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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const token_1 = require("../../utils/token");
const mail_1 = require("../../utils/mail");
const hashPwd_1 = require("../../utils/hashPwd");
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const UserNewsLetter_1 = __importDefault(require("../../models/UserNewsLetter"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_1.default.findOne({ email: req.body.email });
    if (existingUser)
        return (0, baseErrResponse_1.baseErrResponse)(res, 409, "User already exists");
    const dataNewUser = Object.assign({}, req.body);
    const { token, hashedToken, expiryVerification } = (0, token_1.genTokenSHA)("auth");
    dataNewUser.password = yield (0, hashPwd_1.hashPwdBcrypt)(req.body.password);
    const isSubscribedNewsLetter = yield UserNewsLetter_1.default.findOne({
        email: dataNewUser.email,
    });
    if (isSubscribedNewsLetter) {
        const result = yield UserNewsLetter_1.default.deleteOne({
            email: dataNewUser.email,
        });
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) === 1)
            dataNewUser.hasSubscribedToNewsletter = true;
    }
    yield User_1.default.create(Object.assign(Object.assign({}, dataNewUser), { tokens: {
            verifyAccount: {
                hashed: hashedToken,
                expiry: expiryVerification,
            },
        } }));
    const newUser = (yield User_1.default.findOne({
        email: req.body.email,
    })
        .select("email _id")
        .lean());
    yield (0, mail_1.sendUserEmail)({ user: newUser, token, type: "verify-account" });
    return res
        .status(201)
        .json({ msg: "User created successfully", success: true });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!user.isVerified)
        return (0, baseErrResponse_1.baseErrResponse)(res, 403, "User not verified");
    const isSamePwd = yield (0, hashPwd_1.checkPwdBcrypt)(password, user.password);
    if (!isSamePwd)
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Invalid credentials");
    const accessToken = (0, token_1.genAccessJWT)(user._id);
    const { jwe, expiry } = yield (0, token_1.genTokenJWE)(user._id);
    user.tokens.refresh.hashed = jwe;
    user.tokens.refresh.expiry = expiry;
    yield user.save();
    res.cookie("refreshToken", jwe, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiry,
    });
    return res.status(200).json({
        msg: "User logged in successfully",
        success: true,
        accessToken,
    });
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const user = yield User_1.default.findOne({
        "tokens.refresh.hashed": refreshToken !== null && refreshToken !== void 0 ? refreshToken : "",
    });
    if (user) {
        user.tokens.refresh = {
            hashed: null,
            expiry: null,
        };
        user.tokens.manageAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        res.cookie("refreshToken", "", { expires: new Date(0) });
    }
    return res
        .status(200)
        .json({ msg: "User logged out successfully", success: true });
});
exports.logoutUser = logoutUser;
