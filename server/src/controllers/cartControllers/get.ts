import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import { userNotFound } from "../../utils/baseErrResponse.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import Cart from "../../models/Cart.js";

export const getCartUser = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const cart = await Cart.findOne({
    user: makeMongoId(userId ?? ""),
  });

  if (!cart) return res.status(200).json({ msg: "No cart", success: true });

  return res.status(200).json({ msg: "cart", success: false });
};
