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
import { makeSortersMyDishes } from "../../utils/makeSorters/myDishes.js";
import Restaurant from "../../models/Restaurant.js";
import { calcPagination } from "../../utils/calcPagination.js";
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
            .status(200)
            .json({ success: false, msg: "User does not have restaurants" });
    return res.status(200).json({ success: true, infoRestaurants: ids });
});
export const getMyDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId } = req;
    // console.log(req.query);
    const queryObj = makeQueryMyDishes(req);
    const sorterObj = makeSortersMyDishes(req);
    const _g = queryObj !== null && queryObj !== void 0 ? queryObj : {}, { restaurant_name, restaurant_id, restaurant_categories } = _g, rest = __rest(_g, ["restaurant_name", "restaurant_id", "restaurant_categories"]);
    const queryRestaurant = {
        $match: Object.assign(Object.assign(Object.assign({ owner: new mongoose.Types.ObjectId(userId) }, (restaurant_name ? { name: restaurant_name } : {})), (restaurant_id ? { _id: restaurant_id } : {})), (restaurant_categories ? { categories: restaurant_categories } : {})),
    };
    const queryDishes = Object.values(rest).every((val) => val)
        ? {
            $match: Object.assign({}, rest),
        }
        : null;
    const totDocuments = yield Restaurant.countDocuments(queryRestaurant.$match);
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
            totDocuments: 0,
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
