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
      "Phone number is required if set in profile details"
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
        from: "dishes",
        localField: "dishes",
        foreignField: "_id",
        as: "dishes",
      },
    },
    {
      $lookup: {
        from: "orders",
        localField: "orders",
        foreignField: "_id",
        as: "orders",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $facet: {
        paginatedRes: [{ $sort: { createAt: -1 } }],
        totCount: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    restaurants: restaurantsArr?.[0]?.paginatedRes,
    totRestaurants: restaurantsArr?.[0]?.totCount?.[0]?.count,
  });
};
