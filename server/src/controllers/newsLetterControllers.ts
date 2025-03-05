import { Request, Response } from "express";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import User from "../models/User";
import { REG_EMAIL } from "../constants/regex";
import NonLoggedUserNewsLetter from "../models/UserNewsLetter";

export const toggleUserNewsLetter = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { type } = req.body;

  if (!["subscribe", "unsubscribe"].includes(type))
    return res.status(400).json({ msg: "Invalid request", success: false });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { hasSubscribedToNewsletter: type === "subscribe" } },
    { new: true, select: "hasSubscribedToNewsletter firstName lastName email" }
  ).lean();

  if (!updatedUser)
    return res.status(400).json({ msg: "User not found", success: false });

  return res.status(200).json({
    msg: "User subscribed to newsletter",
    success: true,
    user: updatedUser,
  });
};

export const subscribeNonLoggedUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  if (!REG_EMAIL.test(email))
    return res.status(400).json({ msg: "Invalid email", success: false });

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser)
    return res.status(403).json({
      msg: "I do not think user should have arrive til here 🤔",
      success: false,
    });

  const existingSubscription = await User.findOne({ email }).lean();
  if (existingSubscription)
    return res
      .status(403)
      .json({ msg: "User already subscribed", success: false });

  await NonLoggedUserNewsLetter.create({ email });

  return res.status(201).json({
    msg: "User subscribed to newsletter",
    success: true,
  });
};
