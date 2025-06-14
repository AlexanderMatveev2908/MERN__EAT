import { Response } from "express";
import { forbiddenErr, notFoundErr, userNotFound } from "../baseErrResponse.js";
import { RequestWithUserId } from "./../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import Restaurant from "../../models/Restaurant.js";

export const checkUserProperty = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { restId } = req.params;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  const restaurant = await Restaurant.findById(restId);
  if (!restaurant) return notFoundErr(res);
  if (!restaurant.owner.equals(user._id)) return forbiddenErr(res);

  return { user, restaurant };
};
