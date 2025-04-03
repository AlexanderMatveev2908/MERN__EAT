import { Request, Response } from "express";
import User from "../../models/User.js";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import mongoose from "mongoose";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req as any;

  if (!userId) return res.status(200).json({ msg: "No info", success: false });

  const user = await User.findById(userId)
    .select("firstName lastName email hasSubscribedToNewsletter -_id")
    .lean();
  if (!user) return userNotFound(res);

  return res.status(200).json({ success: true, user });
};

export const getUserProfileDetails = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const userArr = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);

  const user = userArr[0];

  if (!user) return userNotFound(res);

  return res.status(200).json({ success: true, user });
};

export const updateProfileDetails = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { firstName, lastName, ...address } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);

  const restaurantsUser: RestaurantType[] = await Restaurant.find({
    owner: makeMongoId(userId ?? ""),
    "contact.phone": user?.address?.phone,
  });

  if (restaurantsUser.length) {
    const promises = restaurantsUser.map(
      async (el) =>
        await Restaurant.findByIdAndUpdate(el._id, {
          $set: { "contact.phone": address.phone },
        })
    );
    await Promise.all(promises);
  }
  await User.findByIdAndUpdate(userId, {
    $set: { firstName, lastName, address },
  });

  return res.status(200).json({ success: true });
};
