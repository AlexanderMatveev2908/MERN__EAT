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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileDetails = exports.getUserProfileDetails = exports.getUserInfo = void 0;
const User_1 = __importDefault(require("../../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const baseErrResponse_1 = require("../../utils/baseErrResponse");
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    if (!userId)
        return (0, baseErrResponse_1.unauthorizedErr)(res, "ACCESS TOKEN NOT PROVIDED");
    const user = yield User_1.default.findById(userId)
        .select("firstName lastName email hasSubscribedToNewsletter -_id")
        .lean();
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    return res.status(200).json({ success: true, user });
});
exports.getUserInfo = getUserInfo;
const getUserProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const userArr = yield User_1.default.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                address: 1,
                _id: 0,
            },
        },
    ]);
    const user = userArr[0];
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    return res.status(200).json({ success: true, user });
});
exports.getUserProfileDetails = getUserProfileDetails;
const updateProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const _a = req.body, { firstName, lastName } = _a, address = __rest(_a, ["firstName", "lastName"]);
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { $set: { firstName, lastName, address } }, { new: true, select: "firstName lastName address -_id" });
    return res.status(200).json({ success: true, user: updatedUser });
});
exports.updateProfileDetails = updateProfileDetails;
