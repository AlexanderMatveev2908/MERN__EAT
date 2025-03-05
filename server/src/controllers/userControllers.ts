import { Request, Response } from "express";
import User from "../models/User";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import mongoose from "mongoose";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req as any;

  if (!userId)
    return res.status(401).json({ msg: "Unauthorized", success: false });

  const user = await User.findById(userId)
    .select("firstName lastName email hasSubscribedToNewsletter")
    .lean();
  if (!user)
    return res.status(400).json({ msg: "user not found", success: false });

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

  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });

  return res.status(200).json({ success: true, user });
};

export const updateProfileDetails = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { firstName, lastName, ...address } = req.body;

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { firstName, lastName, address } },
    { new: true, select: "firstName lastName address -_id" }
  );

  return res.status(200).json({ success: true, user: updatedUser });
};
