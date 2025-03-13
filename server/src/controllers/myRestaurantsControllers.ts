import { Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken.js";
import { uploadCloud } from "../utils/cloud.js";
import { formatMyRestaurantsBody } from "../utils/getValsMyRestaurantFromBody.js";
import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import { baseErrResponse, userNotFound } from "../utils/baseErrResponse.js";

export const createRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.isVerified) return baseErrResponse(res, 403, "User not verified");
  if (!req.body?.phone && !user.address?.phone)
    return baseErrResponse(
      res,
      400,
      "Phone number is required if not specified in profile details"
    );

  const arrImages = await uploadCloud(req.files as Express.Multer.File[]);

  const newRestaurant = await Restaurant.create({
    ...formatMyRestaurantsBody(req, user.email, user.address?.phone),
    images: arrImages,
  });

  return res.status(201).json({ success: true, restId: newRestaurant._id });
};

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
        localField: "_id",
        foreignField: "restaurant",
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
  const { restId } = req.params;

  const restaurant = await Restaurant.findById(restId);
  if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");

  return res.status(200).json({ success: true, restaurant });
};
