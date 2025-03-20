import { Response } from "express";
import User from "../../models/User.js";
import mongoose from "mongoose";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { makeQueryMyDishes } from "../../utils/makeQueries/myDishes.js";
import { makeSortersMyDishes } from "../../utils/makeSorters/myDishes.js";
import Restaurant from "../../models/Restaurant.js";
import { makeLookUp } from "../../utils/dbPipeline/general.js";
import { calcPagination } from "../../utils/calcPagination.js";

export const getRestaurantIds = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const ids = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurants",
        foreignField: "_id",
        as: "restaurants",
      },
    },
    {
      $unwind: "$restaurants",
    },
    {
      $project: {
        _id: "$restaurants._id",
        name: "$restaurants.name",
      },
    },
  ]);

  if (!ids?.length)
    return res
      .status(200)
      .json({ success: false, msg: "User does not have restaurants" });

  return res.status(200).json({ success: true, infoRestaurants: ids });
};

export const getMyDishes = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const queryObj = makeQueryMyDishes(req);
  const sorterObj = makeSortersMyDishes(req);
  const { restaurant_name, restaurant_id, restaurant_categories, ...rest } =
    queryObj ?? {};

  const queryRestaurant: any = {
    $match: {
      owner: new mongoose.Types.ObjectId(userId),
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

  const totDocuments = await Restaurant.countDocuments(queryRestaurant.$match);

  if (!totDocuments)
    return res.status(200).json({
      msg: "User does not have dishes",
      success: true,
      dishes: [],
      totDocuments: 0,
      totPages: 0,
      nHits: 0,
    });

  const { limit, skip } = calcPagination(req);

  const result = await Restaurant.aggregate([
    queryRestaurant,

    {
      $lookup: {
        from: "dishes",
        localField: "dishes",
        foreignField: "_id",
        as: "dishes",
      },
    },

    { $unwind: "$dishes" },

    {
      $set: {
        "dishes.restaurantName": "$name",
        "dishes.categories": "$categories",
      },
    },

    ...(queryDishes ? [queryDishes] : []),
    ...(sorterObj ? [{ $sort: sorterObj }] : []),

    {
      $facet: {
        count: [
          {
            $group: {
              _id: null,
              nHits: { $sum: 1 },
            },
          },
        ],

        paginatedRes: [
          { $skip: skip },
          { $limit: limit },

          {
            $group: {
              _id: null,
              dishes: { $push: "$dishes" },
            },
          },
        ],
      },
    },
  ]);

  const nHits = result[0]?.count?.[0]?.nHits;
  if (!nHits)
    return res.status(200).json({
      success: true,
      dishes: [],
      totDocuments: 0,
      totPages: 0,
      nHits: 0,
    });

  const paginatedDishes = result[0]?.paginatedRes?.[0]?.dishes;
  const totPages = Math.ceil((nHits ?? 0) / limit);

  return res.status(200).json({
    success: true,
    dishes: paginatedDishes,
    totPages,
    totDocuments,
    nHits,
  });
};
