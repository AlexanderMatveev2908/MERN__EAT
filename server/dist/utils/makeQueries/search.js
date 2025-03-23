const makeQueryRange_v_2 = (queryObj, vals, rangeName, limit) => {
    var _a;
    const ranges = vals.split(",");
    let i = 0;
    do {
        const [min, max] = ranges[i].split("-").map((el) => +el);
        if ([min, max].some((v) => isNaN(+v)))
            continue;
        const conditions = [];
        if (max === limit)
            conditions.push({ [`restaurant.${rangeName}`]: { $gte: min } });
        else
            conditions.push({
                [`restaurant.${rangeName}`]: { $gte: min, $lte: max },
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
            queryObj[`restaurant.address.${key}`] = {
                $regex: `.*${req.query[key]}.*`,
                $options: "i",
            };
        if (req.query["name"]) {
            queryObj[`restaurant.name`] = {
                $regex: `.*${req.query["name"]}.*`,
                $options: "i",
            };
        }
    }
    if (categories)
        queryObj[`restaurant.categories`] = {
            $in: categories === null || categories === void 0 ? void 0 : categories.split(","),
        };
    if (avgPriceRange)
        makeQueryRange_v_2(queryObj, avgPriceRange, "avgPrice", 100);
    if (avgPriceRange)
        makeQueryRange_v_2(queryObj, avgRatingRange, "avgRating", 5);
    return Object.keys(queryObj).length ? queryObj : null;
};
