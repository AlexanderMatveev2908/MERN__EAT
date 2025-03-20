import { Request } from "express";
import { REG_MONGO } from "../../config/constants/regex.js";
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

  console.log(req.query);

  const queryObj: any = {};

  if (categories)
    queryObj["restaurantCategories"] = {
      $in: (categories as string).split(","),
    };

  if (search && searchTarget) {
    switch (searchTarget) {
      case "restaurantName":
        queryObj["restaurantName"] = {
          $regex: `.*${search}.*`,
          $options: "i",
        };
        break;

      case "restaurantId":
        queryObj["restaurantId"] = new mongoose.Types.ObjectId(
          search as string
        );
        break;

      default:
        queryObj["restaurants.dishes"] = {
          $elemMatch: {
            $or: [
              searchTarget === "name"
                ? { name: { $regex: `.*${search}.*`, $options: "i" } }
                : null,
              searchTarget === "id"
                ? { _id: new mongoose.Types.ObjectId(search as string) }
                : null,
            ].filter((el) => !!el),
          },
        };
        break;
    }
  }

  const dishFilters = [
    minQuantity ? { quantity: { $lte: +minQuantity } } : null,
    maxQuantity ? { quantity: { $gte: +maxQuantity } } : null,
    minPrice ? { price: { $lte: +minPrice } } : null,
    maxPrice ? { price: { $gte: +maxPrice } } : null,
  ].filter((el) => !!el);

  let queryDishes;
  if (dishFilters.length)
    queryDishes = {
      $elemMatch: {
        $or: [...dishFilters],
      },
    };

  if (!queryObj?.["restaurants.dishes"])
    queryObj["restaurants.dishes"] = queryDishes;
  else queryObj["restaurants.dishes"]["$elemMatch"]["$or"].push(...dishFilters);

  return Object.keys(queryObj).length ? queryObj : null;
};
