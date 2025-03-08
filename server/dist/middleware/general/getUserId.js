"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
const token_1 = require("../../utils/token");
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const getUserId = (req, res, next) => {
    var _a, _b;
    const auth = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.Authorization);
    const token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
    if (!token)
        return next();
    try {
        const decoded = (0, token_1.verifyAccessJWT)(token !== null && token !== void 0 ? token : "");
        req.userId = decoded.userId;
        return next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError")
            return (0, baseErrResponse_1.unauthorizedErr)(res, "ACCESS TOKEN EXPIRED");
        return (0, baseErrResponse_1.unauthorizedErr)(res, "ACCESS TOKEN INVALID");
    }
};
exports.getUserId = getUserId;
