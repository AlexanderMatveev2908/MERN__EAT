import { Response } from "express";
import User from "../../models/User.js";
import mongoose from "mongoose";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { makeQueryMyDishes } from "../../utils/makeQueries/myDishes.js";
import Restaurant from "../../models/Restaurant.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import Dish from "../../models/Dish.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { makeSorters } from "../../utils/makeSorters/general.js";

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
      .status(404)
      .json({ success: false, msg: "User does not have restaurants" });

  return res.status(200).json({ success: true, infoRestaurants: ids });
};

export const getMyDishes = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const queryObj = makeQueryMyDishes(req);
  const sorterObj = makeSorters(req, "dishes.");
  const { queryRestaurant, queryDishes } = queryObj ?? {};

  queryRestaurant.$match = Object.keys(queryRestaurant ?? {}).length
    ? {
        ...queryRestaurant.$match,
        owner: makeMongoId(userId ?? ""),
      }
    : {
        owner: makeMongoId(userId ?? ""),
      };

  const restaurantsUser = Restaurant.find({
    owner: makeMongoId(userId as string),
  });
  const idsRestaurants = (await restaurantsUser).map((el) => el._id);

  const totDocuments = await Dish.countDocuments({
    restaurant: { $in: idsRestaurants },
  });

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
      totDocuments,
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

export const getInfoDishForm = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { dishId } = req?.params;

  const result = await Restaurant.aggregate([
    {
      $match: {
        owner: makeMongoId(userId!),
      },
    },

    {
      $lookup: {
        from: "dishes",
        localField: "dishes",
        foreignField: "_id",
        as: "dishes",
      },
    },

    {
      $unwind: "$dishes",
    },

    {
      $set: {
        "dishes.restaurantName": "$name",
      },
    },

    {
      $match: {
        "dishes._id": makeMongoId(dishId as string),
      },
    },

    {
      $group: {
        _id: null,
        dish: { $first: "$dishes" },
      },
    },
  ]);

  const { dish: { restaurantName, ...dish } = {} } = result?.[0] ?? {};

  if (!Object.keys(dish ?? {}).length)
    return baseErrResponse(res, 404, "Dish not found");

  return res.status(200).json({
    success: true,
    dish,
    restaurantName,
  });
};
