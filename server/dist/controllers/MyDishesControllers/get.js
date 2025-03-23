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
import { makeQueryMyDishes } from "../../utils/makeQueries/myDishes.js";
import Restaurant from "../../models/Restaurant.js";
import { calcPagination } from "../../utils/calcPagination.js";
import Dish from "../../models/Dish.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
export const getRestaurantIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const ids = yield User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(userId) },
        },
        {
            $lookup: {
                from: "restaurants",
                localField: "restaurants",
                foreignField: "_id",
                as: "restaurants",
            },
        },
        {
            $unwind: "$restaurants",
        },
        {
            $project: {
                _id: "$restaurants._id",
                name: "$restaurants.name",
            },
        },
    ]);
    if (!(ids === null || ids === void 0 ? void 0 : ids.length))
        return res
            .status(404)
            .json({ success: false, msg: "User does not have restaurants" });
    return res.status(200).json({ success: true, infoRestaurants: ids });
});
export const getMyDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId } = req;
    const queryObj = makeQueryMyDishes(req);
    const sorterObj = makeSorters(req, "dishes.");
    const { queryRestaurant, queryDishes } = queryObj !== null && queryObj !== void 0 ? queryObj : {};
    queryRestaurant.$match = Object.keys(queryRestaurant !== null && queryRestaurant !== void 0 ? queryRestaurant : {}).length
        ? Object.assign(Object.assign({}, queryRestaurant.$match), { owner: makeMongoId(userId !== null && userId !== void 0 ? userId : "") }) : {
        owner: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    };
    const restaurantsUser = Restaurant.find({
        owner: makeMongoId(userId),
    });
    const idsRestaurants = (yield restaurantsUser).map((el) => el._id);
    const totDocuments = yield Dish.countDocuments({
        restaurant: { $in: idsRestaurants },
    });
    if (!totDocuments)
        return res.status(200).json({
            msg: "User does not have dishes",
            success: true,
            dishes: [],
            totDocuments: 0,
            totPages: 0,
            nHits: 0,
        });
    const { limit, skip } = calcPagination(req);
    const result = yield Restaurant.aggregate([
        queryRestaurant,
        {
            $lookup: {
                from: "dishes",
                localField: "dishes",
                foreignField: "_id",
                as: "dishes",
            },
        },
        { $unwind: "$dishes" },
        {
            $set: {
                "dishes.restaurantName": "$name",
                "dishes.categories": "$categories",
            },
        },
        ...(queryDishes ? [queryDishes] : []),
        ...(sorterObj ? [{ $sort: sorterObj }] : []),
        {
            $facet: {
                count: [
                    {
                        $group: {
                            _id: null,
                            nHits: { $sum: 1 },
                        },
                    },
                ],
                paginatedRes: [
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $group: {
                            _id: null,
                            dishes: { $push: "$dishes" },
                        },
                    },
                ],
            },
        },
    ]);
    const nHits = (_c = (_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.nHits;
    if (!nHits)
        return res.status(200).json({
            success: true,
            dishes: [],
            totDocuments,
            totPages: 0,
            nHits: 0,
        });
    const paginatedDishes = (_f = (_e = (_d = result[0]) === null || _d === void 0 ? void 0 : _d.paginatedRes) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.dishes;
    const totPages = Math.ceil((nHits !== null && nHits !== void 0 ? nHits : 0) / limit);
    return res.status(200).json({
        success: true,
        dishes: paginatedDishes,
        totPages,
        totDocuments,
        nHits,
    });
});
export const getInfoDishForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { dishId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield Restaurant.aggregate([
        {
            $match: {
                owner: makeMongoId(userId),
            },
        },
        {
            $lookup: {
                from: "dishes",
                localField: "dishes",
                foreignField: "_id",
                as: "dishes",
            },
        },
        {
            $unwind: "$dishes",
        },
        {
            $set: {
                "dishes.restaurantName": "$name",
            },
        },
        {
            $match: {
                "dishes._id": makeMongoId(dishId),
            },
        },
        {
            $group: {
                _id: null,
                dish: { $first: "$dishes" },
            },
        },
    ]);
    const _b = ((_a = result === null || result === void 0 ? void 0 : result[0]) !== null && _a !== void 0 ? _a : {}).dish, _c = _b === void 0 ? {} : _b, { restaurantName } = _c, dish = __rest(_c, ["restaurantName"]);
    if (!Object.keys(dish !== null && dish !== void 0 ? dish : {}).length)
        return baseErrResponse(res, 404, "Dish not found");
    return res.status(200).json({
        success: true,
        dish,
        restaurantName,
    });
});
