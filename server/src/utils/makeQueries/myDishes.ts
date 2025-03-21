import { Request } from "express";

import mongoose from "mongoose";

export const makeQueryMyDishes = (req: Request) => {
  const {
    search,
    searchVals: searchTarget,
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    categories,
  } = req.query;

  const queryObj: any = {};

  if (categories)
    queryObj["restaurant_categories"] = {
      $in: (categories as string).split(","),
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
        queryObj["restaurant_id"] = new mongoose.Types.ObjectId(
          search as string
        );
        break;

      default:
        if (searchTarget === "name")
          queryObj["dishes.name"] = { $regex: `.*${search}.*`, $options: "i" };
        else if (searchTarget === "id")
          queryObj["dishes._id"] = new mongoose.Types.ObjectId(
            search as string
          );
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
    if (!queryObj?.["$and"]?.length) queryObj["$and"] = dishFilters;
    else queryObj["$and"] = [...queryObj["$and"], ...dishFilters];
  }

  const { restaurant_name, restaurant_id, restaurant_categories, ...rest } =
    queryObj;

  const queryRestaurant: any = {
    $match: {
      ...(restaurant_name ? { name: restaurant_name } : {}),
      ...(restaurant_id ? { _id: restaurant_id } : {}),
      ...(restaurant_categories ? { categories: restaurant_categories } : {}),
    },
  };

  const queryDishes = Object.values(rest).every((val) => val)
    ? {
        $match: {
          ...rest,
        },
      }
    : null;

  return {
    queryRestaurant,
    queryDishes,
  };
};
