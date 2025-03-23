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
const checkQueryConditions = (query, conditions) => {
    if (conditions === null || conditions === void 0 ? void 0 : conditions.length) {
        if (query["$and"])
            query["$and"] = [...query["$and"], ...conditions];
        else
            query["$and"] = [...conditions];
    }
};
export const makeQueriesMyRestaurants = (req) => {
    var _a;
    const { search, searchVals: valTarget, categories, avgPriceRange, avgRatingRange, avgQuantityRange, ordersStatus, } = req.query;
    const query = {};
    if (search && valTarget) {
        if (valTarget === "name")
            query[`restaurants.name`] = {
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
            query[`restaurants._id`] = new mongoose.Types.ObjectId((_a = search) !== null && _a !== void 0 ? _a : "");
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
        checkQueryConditions(query, ratingConditions);
    }
    if (avgPriceRange) {
        const priceConditions = makeQueryRange(avgPriceRange, "restaurants.avgPrice", 100);
        checkQueryConditions(query, priceConditions);
    }
    if (avgQuantityRange) {
        const quantityConditions = makeQueryRange(avgQuantityRange, "restaurants.avgQuantity", 100);
        checkQueryConditions(query, quantityConditions);
    }
    return Object.keys(query !== null && query !== void 0 ? query : {}).length ? query : null;
};
