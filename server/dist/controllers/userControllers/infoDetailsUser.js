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
import User from "../../models/User.js";
import mongoose from "mongoose";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse.js";
import Restaurant from "../../models/Restaurant.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
export const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    if (!userId)
        return unauthorizedErr(res, "ACCESS TOKEN NOT PROVIDED");
    const user = yield User.findById(userId)
        .select("firstName lastName email hasSubscribedToNewsletter -_id")
        .lean();
    if (!user)
        return userNotFound(res);
    return res.status(200).json({ success: true, user });
});
export const getUserProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const userArr = yield User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
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
        return userNotFound(res);
    return res.status(200).json({ success: true, user });
});
export const updateProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const _a = req.body, { firstName, lastName } = _a, address = __rest(_a, ["firstName", "lastName"]);
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    const restaurantsUser = yield Restaurant.find({
        owner: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
        "contact.phone": user.address.phone,
    });
    if (restaurantsUser.length) {
        const promises = restaurantsUser.map((el) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Restaurant.findByIdAndUpdate(el._id, {
                $set: { "contact.phone": address.phone },
            });
        }));
        yield Promise.all(promises);
    }
    yield User.findByIdAndUpdate(userId, {
        $set: { firstName, lastName, address },
    });
    return res.status(200).json({ success: true });
});
