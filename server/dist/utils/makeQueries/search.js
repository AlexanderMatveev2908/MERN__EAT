const makeQueryRange_v_2 = (queryObj, vals, keyName, limit) => {
    var _a;
    const ranges = vals.split(",");
    let i = 0;
    do {
        const [min, max] = ranges[i].split("-").map((el) => +el);
        if ([min, max].some((v) => isNaN(+v)))
            continue;
        const conditions = [];
        if (max === limit)
            conditions.push({ [`${keyName}`]: { $gte: min } });
        else
            conditions.push({
                [`${keyName}`]: { $gte: min, $lte: max },
            });
        if ((_a = queryObj === null || queryObj === void 0 ? void 0 : queryObj.$and) === null || _a === void 0 ? void 0 : _a.length)
            queryObj.$and.push(...conditions);
        else
            queryObj.$and = conditions;
        i++;
    } while (i < ranges.length);
};
export const makeQuerySearchAllUsers = (req) => {
    const { categories, avgRatingRange, avgPriceRange } = req.query;
    const queryObj = {};
    for (const key of ["country", "state", "city"]) {
        if (req.query[key])
            queryObj[`address.${key}`] = {
                $regex: `.*${req.query[key]}.*`,
                $options: "i",
            };
        if (req.query["name"]) {
            queryObj[`name`] = {
                $regex: `.*${req.query["name"]}.*`,
                $options: "i",
            };
        }
    }
    if (categories)
        queryObj[`categories`] = {
            $in: categories === null || categories === void 0 ? void 0 : categories.split(","),
        };
    if (avgPriceRange)
        makeQueryRange_v_2(queryObj, avgPriceRange, "avgPrice", 100);
    if (avgPriceRange)
        makeQueryRange_v_2(queryObj, avgRatingRange, "avgRating", 5);
    return Object.keys(queryObj).length ? queryObj : null;
};
export const makeQuerySearchDishes = (req) => {
    const { minPrice, maxPrice, minQuantity, maxQuantity } = req.query;
    const queryObj = {};
    const numericFilters = [
        minPrice ? { "dishes.price": { $gte: +minPrice } } : null,
        maxPrice ? { "dishes.price": { $lte: +maxPrice } } : null,
        minQuantity ? { "dishes.quantity": { $gte: +minQuantity } } : null,
        maxQuantity ? { "dishes.quantity": { $lte: +maxQuantity } } : null,
    ].filter((el) => !!el);
    if (numericFilters.length)
        queryObj["$and"] = numericFilters;
    return Object.keys(queryObj).length ? queryObj : null;
};
