var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { uploadCloud } from "../utils/cloud.js";
import { formatMyRestaurantsBody } from "../utils/getValsMyRestaurantFromBody.js";
import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import { baseErrResponse, userNotFound } from "../utils/baseErrResponse.js";
export const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { userId } = req;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!user.isVerified)
        return baseErrResponse(res, 403, "User not verified");
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.phone) && !((_b = user.address) === null || _b === void 0 ? void 0 : _b.phone))
        return baseErrResponse(res, 400, "Phone number is required if not specified in profile details");
    const arrImages = yield uploadCloud(req.files);
    const newRestaurant = yield Restaurant.create(Object.assign(Object.assign({}, formatMyRestaurantsBody(req, user.email, (_c = user.address) === null || _c === void 0 ? void 0 : _c.phone)), { images: arrImages }));
    return res.status(201).json({ success: true, restId: newRestaurant._id });
});
export const getMyRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const restaurantsArr = yield Restaurant.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "reviews",
                localField: "reviews", //local relative to our curr potion (rest)
                foreignField: "_id",
                as: "reviews",
            },
        },
        {
            $addFields: {
                dishesCount: {
                    $size: "$dishes",
                },
                ordersCount: {
                    $size: "$orders",
                },
                reviewsCount: {
                    $size: "$reviews",
                },
                avgRating: {
                    $ifNull: [{ $avg: "$reviews.rating" }, 0],
                },
            },
        },
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                paginatedRes: [
                    {
                        $project: {
                            dishes: 0,
                            orders: 0,
                            reviews: 0,
                            owner: 0,
                            __v: 0,
                        },
                    },
                ],
                totCount: [
                    {
                        $count: "count",
                    },
                ],
            },
        },
    ]);
    if (!((_a = restaurantsArr === null || restaurantsArr === void 0 ? void 0 : restaurantsArr[0]) === null || _a === void 0 ? void 0 : _a.totCount))
        return res
            .status(200)
            .json({ success: true, restaurants: [], totRestaurants: 0 });
    return res.status(200).json({
        success: true,
        restaurants: restaurantsArr[0].paginatedRes,
        totRestaurants: restaurantsArr[0].totCount[0].count,
    });
});
export const getMySingleRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restId } = req.params;
    const restaurant = yield Restaurant.findById(restId);
    if (!restaurant)
        return baseErrResponse(res, 404, "Restaurant not found");
    return res.status(200).json({ success: true, restaurant });
});
