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
import mongoose from "mongoose";
export const makeQueryMyDishes = (req) => {
    var _a;
    const { search, searchVals: searchTarget, minPrice, maxPrice, minQuantity, maxQuantity, categories, } = req.query;
    const queryObj = {};
    if (categories)
        queryObj["restaurant_categories"] = {
            $in: categories.split(","),
        };
    if (search && searchTarget) {
        switch (searchTarget) {
            case "restaurantName":
                queryObj["restaurant_name"] = {
                    $regex: `.*${search}.*`,
                    $options: "i",
                };
                break;
            case "restaurantId":
                queryObj["restaurant_id"] = new mongoose.Types.ObjectId(search);
                break;
            default:
                if (searchTarget === "name")
                    queryObj["dishes.name"] = { $regex: `.*${search}.*`, $options: "i" };
                else if (searchTarget === "id")
                    queryObj["dishes._id"] = new mongoose.Types.ObjectId(search);
                break;
        }
    }
    const dishFilters = [
        minQuantity ? { "dishes.quantity": { $gte: +minQuantity } } : null,
        maxQuantity ? { "dishes.quantity": { $lte: +maxQuantity } } : null,
        minPrice ? { "dishes.price": { $gte: +minPrice } } : null,
        maxPrice ? { "dishes.price": { $lte: +maxPrice } } : null,
    ].filter((el) => !!el);
    if (dishFilters.length) {
        if (!((_a = queryObj === null || queryObj === void 0 ? void 0 : queryObj["$and"]) === null || _a === void 0 ? void 0 : _a.length))
            queryObj["$and"] = dishFilters;
        else
            queryObj["$and"] = [...queryObj["$and"], ...dishFilters];
    }
    const { restaurant_name, restaurant_id, restaurant_categories } = queryObj, rest = __rest(queryObj, ["restaurant_name", "restaurant_id", "restaurant_categories"]);
    const queryRestaurant = {
        $match: Object.assign(Object.assign(Object.assign({}, (restaurant_name ? { name: restaurant_name } : {})), (restaurant_id ? { _id: restaurant_id } : {})), (restaurant_categories ? { categories: restaurant_categories } : {})),
    };
    const queryDishes = Object.values(rest).every((val) => val)
        ? {
            $match: Object.assign({}, rest),
        }
        : null;
    return {
        queryRestaurant,
        queryDishes,
    };
};
