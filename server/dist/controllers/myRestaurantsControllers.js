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
exports.getMyRestaurants = exports.createRestaurant = void 0;
const cloud_1 = require("../utils/cloud");
const getValsMyRestaurantFromBody_1 = require("../utils/getValsMyRestaurantFromBody");
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const baseErrResponse_1 = require("../utils/baseErrResponse");
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId } = req;
    const user = yield User_1.default.findById(userId);
    if (!user)
        return (0, baseErrResponse_1.userNotFound)(res);
    if (!user.isVerified)
        return (0, baseErrResponse_1.baseErrResponse)(res, 403, "User not verified");
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.phone) && !((_b = user.address) === null || _b === void 0 ? void 0 : _b.phone))
        return (0, baseErrResponse_1.baseErrResponse)(res, 400, "Phone number is required if set in profile details");
    const arrImages = yield (0, cloud_1.uploadCloud)(req.files);
    const newRestaurant = yield Restaurant_1.default.create(Object.assign(Object.assign({}, (0, getValsMyRestaurantFromBody_1.formatMyRestaurantsBody)(req, user.email, (_c = user.address) === null || _c === void 0 ? void 0 : _c.phone)), { images: arrImages }));
    return res.status(201).json({ success: true, restId: newRestaurant._id });
});
exports.createRestaurant = createRestaurant;
const getMyRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId } = req;
    const restaurantsArr = yield Restaurant_1.default.aggregate([
        { $match: { owner: new mongoose_1.default.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "dishes",
                localField: "dishes",
                foreignField: "_id",
                as: "dishes",
            },
        },
        {
            $lookup: {
                from: "orders",
                localField: "orders",
                foreignField: "_id",
                as: "orders",
            },
        },
        {
            $lookup: {
                from: "reviews",
                localField: "reviews",
                foreignField: "_id",
                as: "reviews",
            },
        },
        {
            $facet: {
                paginatedRes: [{ $sort: { createAt: -1 } }],
                totCount: [
                    {
                        $count: "count",
                    },
                ],
            },
        },
    ]);
    return res.status(200).json({
        success: true,
        restaurants: (_a = restaurantsArr === null || restaurantsArr === void 0 ? void 0 : restaurantsArr[0]) === null || _a === void 0 ? void 0 : _a.paginatedRes,
        totRestaurants: (_d = (_c = (_b = restaurantsArr === null || restaurantsArr === void 0 ? void 0 : restaurantsArr[0]) === null || _b === void 0 ? void 0 : _b.totCount) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.count,
    });
});
exports.getMyRestaurants = getMyRestaurants;
