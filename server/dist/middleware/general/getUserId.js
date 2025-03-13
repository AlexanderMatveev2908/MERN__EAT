import { verifyAccessJWT } from "../../utils/token.js";
import { unauthorizedErr, } from "../../utils/baseErrResponse.js";
export const getUserId = (req, res, next) => {
    var _a, _b;
    const auth = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.Authorization);
    const token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
    if (!token)
        return next();
    try {
        const decoded = verifyAccessJWT(token !== null && token !== void 0 ? token : "");
        req.userId = decoded.userId;
        return next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError")
            return unauthorizedErr(res, "ACCESS TOKEN EXPIRED");
        return unauthorizedErr(res, "ACCESS TOKEN INVALID");
    }
};
