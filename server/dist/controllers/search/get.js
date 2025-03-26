var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { makeQuerySearchAllUsers, makeQuerySearchDishes, } from "../../utils/makeQueries/search.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import Restaurant from "../../models/Restaurant.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { REG_MONGO } from "../../config/constants/regex.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish from "../../models/Dish.js";
export const getRestaurantsSearchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId } = req;
    const queryObj = makeQuerySearchAllUsers(req);
    const sorter = makeSorters(req, "restaurant.");
    const { limit, skip } = calcPagination(req);
    const totDocuments = yield Restaurant.countDocuments();
    if (!totDocuments)
        return res.status(200).json({
            msg: "No restaurants found",
            success: true,
            totDocuments,
            totPages: 0,
            restaurants: [],
            nHits: 0,
        });
    console.log(sorter);
    // IMPORTANT => THERE IS ABSOLUTE NO NEED TO UNWIND DOCUMENTS, I DID IT ONLY TO COMPLICATE STUFF SO I CAN EXERCISE WITH DIFFERENT SITUATIONS IN WHICH I CAN FIND MYSELF DURING AGGREGATIONS
    const result = yield Restaurant.aggregate([
        //  parent document is Rest, we watch for all children refs, i do not know if i can use terms parent and children in this context but for me make s sense
        {
            $lookup: {
                from: "dishes",
                localField: "dishes",
                foreignField: "_id",
                as: "dishes",
            },
        },
        {
            $set: {
                dishesCount: { $size: "$dishes" },
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
        // in some way we can similarly consider $ in front of a field like this in oop, cause it allow access fields of current document in a certain stage like $set $project or $group
        // $$ refers to system vars in mongoDB like $$value in reduce that is like curr in js, or $$ROOT  that is curr document before stages, but also dynamic vars created in $map, $filter operations
        //  no need for $ when create new custom fields
        // without preserve empty rest with no dishes will be not mapped cause no data to work with
        { $unwind: { path: "$dishes", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
        {
            $set: Object.assign({ deliveryTime: "$delivery.estTimeDelivery", deliveryPrice: "$delivery.price" }, (REG_MONGO.test(userId !== null && userId !== void 0 ? userId : "")
                ? {
                    isAdmin: {
                        $cond: {
                            if: { $eq: [makeMongoId(userId !== null && userId !== void 0 ? userId : ""), "$owner"] },
                            then: true,
                            else: false,
                        },
                    },
                }
                : {})),
        },
        //  to practice as more as possible with aggregations i tried to make for each controller i need a new one,
        // here to prevent document from being counted for each unwind subDocument i need to group them before make calc nHits and calc pagination or there will be duplicated of a rest as many subDocuments of each parent document
        {
            $group: {
                _id: "$_id",
                data: { $first: "$$ROOT" },
                dishes: { $push: "$dishes" },
                reviews: { $push: "$reviews" },
                avgPrice: { $avg: { $ifNull: ["$dishes.price", 0] } },
                avgRating: { $avg: { $ifNull: ["$reviews.rating", 0] } },
                dishesCount: { $first: "$dishesCount" },
            },
        },
        { $unset: ["data.orders", "data.__v"] },
        {
            // i need to make a structure easy to work with so i merge data in unique obj named rest with all data looked
            $project: {
                restaurant: {
                    $mergeObjects: [
                        "$data",
                        // {
                        //   dishes: "$dishes",
                        //   reviews: "$reviews",
                        // },
                        {
                            avgPrice: "$avgPrice",
                            avgRating: "$avgRating",
                            isAdmin: "$isAdmin",
                        },
                    ],
                },
            },
        },
        ...(queryObj ? [{ $match: queryObj }] : []),
        {
            $facet: {
                count: [
                    {
                        $count: "nHits",
                    },
                ],
                // IMPORTANT => GROUP STAGE SHUFFLE A LITTLE ORDER DOCUMENTS, IN THIS CASE THERE ARE PRETTY MUCH GROUP USED, SO
                // WHEN THERE IS NO SORTER OR THERE IS BUT MISS DATA TO SORT LIKE IF A REST DOES NOT HAVE REVIEWS, THEN I WILL
                //  DEFAULT SORT AS LAST WALL WITH CREATED AT , BUT I THINK IS ONLY NEEDED TO CHOSE A FIELDS THAT CAN REALLY SORT DOCUMENTS AND NOT RETURN 0 IN A COMPARISON GREATER FEWER
                resPaginated: [
                    ...(sorter
                        ? [{ $sort: Object.assign(Object.assign({}, sorter), { "restaurant.createdAt": -1 }) }]
                        : [{ $sort: { "restaurant.createdAt": -1 } }]),
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $group: {
                            _id: null,
                            restaurants: { $push: "$restaurant" },
                        },
                    },
                ],
            },
        },
    ]);
    const nHits = (_c = (_b = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a.count) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.nHits;
    const restaurants = (_f = (_e = (_d = result === null || result === void 0 ? void 0 : result[0]) === null || _d === void 0 ? void 0 : _d.resPaginated) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.restaurants;
    const totPages = Math.ceil((nHits !== null && nHits !== void 0 ? nHits : 0) / limit);
    if (!nHits)
        return res.status(200).json({
            msg: "No restaurants found",
            success: true,
            totDocuments,
            totPages,
            nHits,
            restaurants: [],
        });
    return res.status(200).json({
        msg: "ok",
        success: true,
        totDocuments,
        totPages,
        nHits,
        restaurants,
    });
});
export const getRestaurantAsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { restId } = req.params;
    const restaurant = yield Restaurant.findById(restId).lean();
    if (!restaurant)
        return baseErrResponse(res, 404, "Restaurant not found");
    restaurant.isAdmin = REG_MONGO.test(userId !== null && userId !== void 0 ? userId : "")
        ? restaurant.owner + "" === userId
        : false;
    return res.status(200).json({
        msg: "ok",
        success: true,
        restaurant,
    });
});
export const getDishesRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { restId } = req.params;
    const { userId } = req;
    const totDocuments = yield Dish.countDocuments({
        restaurant: makeMongoId(restId),
    });
    if (!totDocuments)
        return res.status(200).json({ msg: "No dishes", success: true });
    const queryObj = makeQuerySearchDishes(req);
    const sorter = makeSorters(req, "dishes.");
    const { limit, skip } = calcPagination(req);
    const result = yield Restaurant.aggregate([
        { $match: { _id: makeMongoId(restId !== null && restId !== void 0 ? restId : "") } },
        ...(REG_MONGO.test(userId !== null && userId !== void 0 ? userId : "")
            ? [
                {
                    $set: {
                        isAdmin: {
                            $cond: {
                                if: { $eq: ["$owner", makeMongoId(userId !== null && userId !== void 0 ? userId : "")] },
                                then: true,
                                else: false,
                            },
                        },
                    },
                },
            ]
            : []),
        {
            $lookup: {
                from: "dishes",
                localField: "dishes",
                foreignField: "_id",
                as: "dishes",
            },
        },
        { $unwind: "$dishes" },
        ...(queryObj ? [{ $match: queryObj }] : []),
        ...(sorter ? [{ $sort: sorter }] : []),
        {
            $facet: {
                count: [{ $count: "nHits" }],
                resPaginated: [
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $group: {
                            _id: null,
                            dishes: { $push: "$dishes" },
                            isAdmin: { $first: "$isAdmin" },
                        },
                    },
                    {
                        $project: {
                            dishes: 1,
                            isAdmin: 1,
                        },
                    },
                ],
            },
        },
    ]);
    const nHits = (_c = (_b = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a.count) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.nHits;
    const dishes = (_f = (_e = (_d = result === null || result === void 0 ? void 0 : result[0]) === null || _d === void 0 ? void 0 : _d.resPaginated) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.dishes;
    const totPages = Math.ceil((nHits !== null && nHits !== void 0 ? nHits : 0) / limit);
    const isAdmin = (_j = (_h = (_g = result === null || result === void 0 ? void 0 : result[0]) === null || _g === void 0 ? void 0 : _g.resPaginated) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.isAdmin;
    return res
        .status(200)
        .json({ success: true, nHits, totDocuments, totPages, dishes, isAdmin });
});
