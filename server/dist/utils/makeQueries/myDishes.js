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
    return Object.keys(queryObj).length ? queryObj : null;
};
