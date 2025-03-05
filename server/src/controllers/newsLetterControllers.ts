import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import User from "../models/User";

export const subscribeUserNewsLetter = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { hasSubscribedToNewsletter: true } },
    { new: true, select: "hasSubscribedToNewsletter" }
  ).lean();

  if (!updatedUser)
    return res.status(400).json({ msg: "User not found", success: false });

  return res.status(200).json({
    msg: "User subscribed to newsletter",
    success: true,
  });
};
