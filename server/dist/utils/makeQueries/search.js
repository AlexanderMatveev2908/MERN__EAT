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
    const { categories, avgRatingRange, avgPriceRange, openHours } = req.query;
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
    if (openHours) {
        // const currTime = 8 * 60;
        const currTime = new Date().getHours() * 60 + new Date().getMinutes();
        const vals = openHours.split(",");
        if (vals.includes("openNow"))
            queryObj["$or"] = [
                {
                    //  bar from 10 to 20 => user go 15 ✔️
                    $and: [
                        { "openHours.openTime": { $lte: currTime } },
                        { "openHours.closeTime": { $gt: currTime } },
                    ],
                },
                {
                    //  bar from 20 to 5 => user go 2 ✔️
                    $and: [
                        { "openHours.openTime": { $lte: currTime } },
                        {
                            $expr: { $lt: ["$openHours.closeTime", "$openHours.openTime"] },
                        },
                    ],
                },
                {
                    // bar from 2 to 8 => user go 3 ✔️
                    $and: [
                        { "openHours.openTime": { $gte: currTime } },
                        {
                            $expr: { $lt: ["$openHours.closeTime", "$openHours.openTime"] },
                        },
                        { "openHours.closeTime": { $gt: currTime } },
                    ],
                },
                //  24/7 ✔️
                { $expr: { $eq: ["$openHours.closeTime", "$openHours.openTime"] } },
            ];
        if (vals.includes("closed")) {
            const queryClosed = [
                {
                    //  bar from 8 to 16 => user go 4 ❌
                    // only gt cause open eq curr would means open now
                    $and: [
                        { "openHours.openTime": { $gt: currTime } },
                        { "openHours.closeTime": { $gt: currTime } },
                        {
                            $expr: {
                                $gt: ["$openHours.closeTime", "$openHours.openTime"],
                            },
                        },
                    ],
                },
                {
                    //  bar from 8 to 16 => user go 16 or 17 ❌
                    //  bar from 21 to 3 => user go 4 ❌
                    //  also eq curr cause it fu go in close time not allowed entry building
                    $and: [
                        { "openHours.openTime": { $lt: currTime } },
                        { "openHours.closeTime": { $lte: currTime } },
                        {
                            // exclude 24/7
                            $expr: {
                                $ne: ["$openHours.openTime", "$openHours.closeTime"],
                            },
                        },
                    ],
                },
                {
                    // bar from 21 to 3 => user go 3 or 4 ❌
                    $and: [
                        { "openHours.openTime": { $gt: currTime } },
                        { "openHours.closeTime": { $lte: currTime } },
                        {
                            $expr: {
                                $lt: ["$openHours.closeTime", "$openHours.openTime"],
                            },
                        },
                        {
                            $expr: {
                                $ne: ["$openHours.openTime", "$openHours.closeTime"],
                            },
                        },
                    ],
                },
            ];
            if (queryObj === null || queryObj === void 0 ? void 0 : queryObj.$or)
                queryObj.$or.push(...queryClosed);
            else
                queryObj.$or = queryClosed;
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
