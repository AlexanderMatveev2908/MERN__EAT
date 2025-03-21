var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verifyAccessJWT } from "../../utils/token.js";
import { unauthorizedErr } from "../../utils/baseErrResponse.js";
import User from "../../models/User.js";
export const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const auth = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.Authorization);
    const token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
    if (!token)
        return unauthorizedErr(res, "ACCESS TOKEN NOT PROVIDED");
    try {
        const decoded = verifyAccessJWT(token);
        try {
            const user = yield User.findById(decoded.userId);
            if (!user)
                return unauthorizedErr(res, "USER DOES NOT EXIST");
            if (!user.isVerified)
                return unauthorizedErr(res, "USER NOT VERIFIED");
        }
        catch (err) {
            return res.status(err.status || 500).json({
                success: false,
                msg: "Oops! Our server decided to take a coffee break ☕. Try again later!",
            });
        }
        req.userId = decoded.userId;
        return next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError")
            return unauthorizedErr(res, "ACCESS TOKEN EXPIRED");
        return unauthorizedErr(res, "ACCESS TOKEN INVALID");
    }
});
