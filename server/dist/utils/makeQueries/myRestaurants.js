import { REG_SEARCH } from "../../config/constants/regex.js";
import mongoose from "mongoose";
const makeQueryRange = (rangeVal, rangeName, limit) => {
    const ranges = rangeVal === null || rangeVal === void 0 ? void 0 : rangeVal.split(",");
    const conditions = [];
    for (const range of ranges) {
        const [min, max] = range.split("-").map((el) => +el);
        if ([min, max].every((el) => !isNaN(el)))
            if (max === limit)
                conditions.push({ [rangeName]: { $gte: min } });
            else
                conditions.push({ [rangeName]: { $gte: min, $lte: max } });
    }
    return conditions;
};
export const makeQueriesMyRestaurants = (req) => {
    var _a, _b;
    const { search, searchVals: valTarget, categories, avgPriceRange, avgRatingRange, ordersStatus, } = req.query;
    const query = {};
    if (search && valTarget && REG_SEARCH.test((_a = search) !== null && _a !== void 0 ? _a : "")) {
        if (valTarget === "name")
            query[`restaurants.${valTarget}`] = {
                $regex: `.*${search}.*`,
                $options: "i",
            };
        else if (["country", "state", "city"].includes(valTarget)) {
            query[`restaurants.address.${valTarget}`] = {
                $regex: `.*${search}.*`,
                $options: "i",
            };
        }
        else if (valTarget === "id")
            query[`restaurants._id`] = new mongoose.Types.ObjectId((_b = search) !== null && _b !== void 0 ? _b : "");
    }
    if (ordersStatus)
        query["restaurants.orders"] = {
            $elemMatch: {
                status: {
                    $in: ordersStatus === null || ordersStatus === void 0 ? void 0 : ordersStatus.split(","),
                },
            },
        };
    if (categories)
        query["restaurants.categories"] = {
            $in: categories === null || categories === void 0 ? void 0 : categories.split(","),
        };
    if (avgRatingRange) {
        const ratingConditions = makeQueryRange(avgRatingRange, "restaurants.avgRating", 5);
        if (ratingConditions === null || ratingConditions === void 0 ? void 0 : ratingConditions.length)
            if (query["$or"])
                query["$or"] = [...query["$or"], ...ratingConditions];
            else
                query["$or"] = [...ratingConditions];
    }
    if (avgPriceRange) {
        const priceConditions = makeQueryRange(avgPriceRange, "restaurants.avgPrice", 100);
        if (priceConditions === null || priceConditions === void 0 ? void 0 : priceConditions.length)
            if (query["$or"])
                query["$or"] = [...query["$or"], ...priceConditions];
            else
                query["$or"] = [...priceConditions];
    }
    return Object.keys(query !== null && query !== void 0 ? query : {}).length ? query : null;
};
