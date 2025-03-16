import { Request } from "express";
import { REG_SEARCH } from "../../config/constants/regex.js";
import mongoose from "mongoose";

const makeQueryRange = (
  rangeVal: string,
  rangeName: string,
  limit?: number
) => {
  const ranges = rangeVal?.split(",");
  const conditions = [];

  for (const range of ranges) {
    const [min, max] = range.split("-").map((el) => +el);

    if ([min, max].every((el) => !isNaN(el)))
      if (max === limit) conditions.push({ [rangeName]: { $gte: min } });
      else conditions.push({ [rangeName]: { $gte: min, $lte: max } });
  }

  return conditions;
};

export const makeQueriesMyRestaurants = (req: Request) => {
  const {
    search,
    searchVals: valTarget,
    categories,
    priceRange,
    ratingRange,
    ordersState,
  } = req.query;

  const query: any = {};

  if (search && valTarget && REG_SEARCH.test((search as string) ?? "")) {
    if (valTarget === "name")
      query[`restaurants.${valTarget}`] = {
        $regex: `.*${search as string}.*`,
        $options: "i",
      };
    else if (["country", "state", "city"].includes(valTarget as string)) {
      query[`restaurants.address.${valTarget}`] = {
        $regex: `.*${search as string}.*`,
        $options: "i",
      };
    } else if (valTarget === "id")
      query[`restaurants._id`] = new mongoose.Types.ObjectId(
        (search as string) ?? ""
      );
  }

  if (ordersState)
    query["restaurants.orders"] = {
      $elemMatch: {
        status: {
          $in: (ordersState as string)?.split(","),
        },
      },
    };

  if (categories)
    query["restaurants.categories"] = {
      $in: (categories as string)?.split(","),
    };

  if (ratingRange) {
    const ratingConditions = makeQueryRange(
      ratingRange as string,
      "restaurants.avgRating",
      5
    );

    if (ratingConditions?.length)
      if (query["$or"]) query["$or"] = [...query["$or"], ...ratingConditions];
      else query["$or"] = [...ratingConditions];
  }

  if (priceRange) {
    const priceConditions = makeQueryRange(
      priceRange as string,
      "restaurants.avgPrice",
      100
    );

    if (priceConditions?.length)
      if (query["$or"]) query["$or"] = [...query["$or"], ...priceConditions];
      else query["$or"] = [...priceConditions];
  }

  return { query: Object.keys(query ?? {}).length ? query : null };
};
