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
exports.deleteAccount = void 0;
const User_1 = __importDefault(require("../../models/User"));
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const token_1 = require("../../utils/token");
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId } = req;
    const { manageAccountToken } = req.body;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!((_a = user.tokens.manageAccount) === null || _a === void 0 ? void 0 : _a.hashed))
        return (0, baseErrResponse_1.unauthorizedErr)(res, "Verification token not emitted");
    const isExpired = new Date((_c = (_b = user.tokens.manageAccount) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    const isMatch = (0, token_1.checkTokenSHA)(manageAccountToken, (_d = user.tokens.manageAccount) === null || _d === void 0 ? void 0 : _d.hashed, "manageAccount");
    if (isExpired || !isMatch) {
        user.tokens.manageAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return (0, baseErrResponse_1.unauthorizedErr)(res, isExpired ? "Token expired" : "Invalid Token");
    }
    const result = yield User_1.default.deleteOne({ _id: userId });
    if ((result === null || result === void 0 ? void 0 : result.deletedCount) !== 1)
        return (0, baseErrResponse_1.userNotFound)(res);
    else
        return res.status(200).json({ success: true, msg: "Account deleted" });
});
exports.deleteAccount = deleteAccount;
