import { Request } from "express";
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

const checkQueryConditions = (query: any, conditions: any) => {
  if (conditions?.length) {
    if (query["$and"]) query["$and"] = [...query["$and"], ...conditions];
    else query["$and"] = [...conditions];
  }
};

export const makeQueriesMyRestaurants = (req: Request) => {
  const {
    search,
    searchVals: valTarget,
    categories,
    avgPriceRange,
    avgRatingRange,
    avgQuantityRange,
    ordersStatus,
  } = req.query;

  const query: any = {};

  if (search && valTarget) {
    if (valTarget === "name")
      query[`restaurants.name`] = {
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

  if (ordersStatus)
    query["restaurants.orders"] = {
      $elemMatch: {
        status: {
          $in: (ordersStatus as string)?.split(","),
        },
      },
    };

  if (categories)
    query["restaurants.categories"] = {
      $in: (categories as string)?.split(","),
    };

  if (avgRatingRange) {
    const ratingConditions = makeQueryRange(
      avgRatingRange as string,
      "restaurants.avgRating",
      5
    );

    checkQueryConditions(query, ratingConditions);
  }

  if (avgPriceRange) {
    const priceConditions = makeQueryRange(
      avgPriceRange as string,
      "restaurants.avgPrice",
      100
    );

    checkQueryConditions(query, priceConditions);
  }

  if (avgQuantityRange) {
    const quantityConditions = makeQueryRange(
      avgQuantityRange as string,
      "restaurants.avgQuantity",
      100
    );

    checkQueryConditions(query, quantityConditions);
  }

  return Object.keys(query ?? {}).length ? query : null;
};
