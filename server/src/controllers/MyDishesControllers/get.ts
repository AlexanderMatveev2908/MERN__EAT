import { Response } from "express";
import User from "../../models/User.js";
import mongoose from "mongoose";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";

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
