import { query, Request } from "express";

const makeQueryRange_v_2 = (
  queryObj: any,
  vals: string,
  keyName: string,
  limit: number
) => {
  const ranges = vals.split(",");

  let i = 0;
  do {
    const [min, max] = ranges[i].split("-").map((el) => +el);

    if ([min, max].some((v) => isNaN(+v))) continue;

    const conditions: any = [];
    if (max === limit) conditions.push({ [`${keyName}`]: { $gte: min } });
    else
      conditions.push({
        [`${keyName}`]: { $gte: min, $lte: max },
      });

    if (queryObj?.$and?.length) queryObj.$and.push(...conditions);
    else queryObj.$and = conditions;

    i++;
  } while (i < ranges.length);
};

export const makeQuerySearchAllUsers = (req: Request) => {
  const { categories, avgRatingRange, avgPriceRange, openHours } = req.query;

  const queryObj: any = {};

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
    // const currTime = 1320;
    const currTime = new Date().getHours() * 60 + new Date().getMinutes();

    queryObj["$or"] = [
      {
        // first case simple day of work from morning to evening or night
        $and: [
          {
            "openHours.openTime": { $lte: currTime },
            "openHours.closeTime": { $gt: currTime },
          },
        ],
      },
      {
        //  when restaurant work more during night like opening at 21 and closing at 4 or 6
        $and: [
          { "openHours.openTime": { $lte: currTime } },
          {
            $or: [
              { "openHours.closeTime": { $lt: currTime } },
              {
                "openHours.closeTime": { $gt: currTime },
              },
            ],
          },
        ],
      },
    ];
  }

  if (categories)
    queryObj[`categories`] = {
      $in: (categories as string)?.split(","),
    };

  if (avgPriceRange)
    makeQueryRange_v_2(queryObj, avgPriceRange as string, "avgPrice", 100);
  if (avgPriceRange)
    makeQueryRange_v_2(queryObj, avgRatingRange as string, "avgRating", 5);

  return Object.keys(queryObj).length ? queryObj : null;
};

export const makeQuerySearchDishes = (req: Request) => {
  const { minPrice, maxPrice, minQuantity, maxQuantity } = req.query;

  const queryObj: any = {};

  const numericFilters = [
    minPrice ? { "dishes.price": { $gte: +minPrice } } : null,

    maxPrice ? { "dishes.price": { $lte: +maxPrice } } : null,

    minQuantity ? { "dishes.quantity": { $gte: +minQuantity } } : null,

    maxQuantity ? { "dishes.quantity": { $lte: +maxQuantity } } : null,
  ].filter((el) => !!el);

  if (numericFilters.length) queryObj["$and"] = numericFilters;

  return Object.keys(queryObj).length ? queryObj : null;
};
