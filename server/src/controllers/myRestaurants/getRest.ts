import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Restaurant from "../../models/Restaurant.js";
import mongoose from "mongoose";
import { checkUserProperty } from "../../utils/checkers/myRestaurants.js";

export const getMyRestaurants = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const restaurantsArr = await Restaurant.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews", //local relative to our curr potion (rest)
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $addFields: {
        dishesCount: {
          $size: "$dishes",
        },
        ordersCount: {
          $size: "$orders",
        },
        reviewsCount: {
          $size: "$reviews",
        },
        avgRating: {
          $ifNull: [{ $avg: "$reviews.rating" }, 0],
        },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        paginatedRes: [
          {
            $project: {
              dishes: 0,
              orders: 0,
              reviews: 0,
              owner: 0,
              __v: 0,
            },
          },
        ],
        totCount: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  if (!restaurantsArr?.[0]?.totCount)
    return res
      .status(200)
      .json({ success: true, restaurants: [], totRestaurants: 0 });

  return res.status(200).json({
    success: true,
    restaurants: restaurantsArr[0].paginatedRes,
    totRestaurants: restaurantsArr[0].totCount[0].count,
  });
};

export const getMySingleRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const result = await checkUserProperty(req, res);
  if (!result) return;

  const { user, restaurant } = result;

  return res.status(200).json({ success: true, restaurant });
};
