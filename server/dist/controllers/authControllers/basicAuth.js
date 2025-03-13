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
import { genAccessJWT, genTokenJWE, genTokenSHA } from "../../utils/token.js";
import { sendUserEmail } from "../../utils/mail.js";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd.js";
import { baseErrResponse, unauthorizedErr, userNotFound, } from "../../utils/baseErrResponse.js";
import NonLoggedUserNewsLetter from "../../models/UserNewsLetter.js";
import { isDev } from "../../config/currMode.js";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User.findOne({ email: req.body.email });
    if (existingUser)
        return baseErrResponse(res, 409, "User already exists");
    const dataNewUser = Object.assign({}, req.body);
    const { token, hashedToken, expiryVerification } = genTokenSHA("auth");
    dataNewUser.password = yield hashPwdBcrypt(req.body.password);
    const isSubscribedNewsLetter = yield NonLoggedUserNewsLetter.findOne({
        email: dataNewUser.email,
    });
    if (isSubscribedNewsLetter) {
        const result = yield NonLoggedUserNewsLetter.deleteOne({
            email: dataNewUser.email,
        });
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) === 1)
            dataNewUser.hasSubscribedToNewsletter = true;
    }
    yield User.create(Object.assign(Object.assign({}, dataNewUser), { tokens: {
            verifyAccount: {
                hashed: hashedToken,
                expiry: expiryVerification,
            },
        } }));
    const newUser = (yield User.findOne({
        email: req.body.email,
    })
        .select("email _id")
        .lean());
    yield sendUserEmail({ user: newUser, token, type: "verify-account" });
    return res
        .status(201)
        .json({ msg: "User created successfully", success: true });
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({ email });
    if (!user)
        return userNotFound(res);
    if (!user.isVerified)
        return baseErrResponse(res, 403, "User not verified");
    const isSamePwd = yield checkPwdBcrypt(password, user.password);
    if (!isSamePwd)
        return unauthorizedErr(res, "Invalid credentials");
    const accessToken = genAccessJWT(user._id);
    const { jwe, expiry } = yield genTokenJWE(user._id);
    user.tokens.refresh.hashed = jwe;
    user.tokens.refresh.expiry = expiry;
    yield user.save();
    res.cookie("refreshToken", jwe, {
        httpOnly: true,
        secure: isDev,
        expires: expiry,
    });
    return res.status(200).json({
        msg: "User logged in successfully",
        success: true,
        accessToken,
    });
});
export const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const user = yield User.findOne({
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
