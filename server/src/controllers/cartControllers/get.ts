import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import Cart, { CartType } from "../../models/Cart.js";
import Dish from "../../models/Dish.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";

export const getCartUser = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const cart = (await Cart.findOne({
    user: makeMongoId(userId ?? ""),
  }).lean()) as CartType;

  if (!cart)
    return res.status(200).json({ msg: "No cart", success: true, cart });

  cart.totQty = cart?.items.reduce((acc, curr) => curr.quantity + acc, 0) || 0;
  cart.totPrice = +(
    cart?.items
      .reduce((acc, curr) => curr.price * curr.quantity + acc, 0)
      .toFixed(2) || ""
  );

  return res.status(200).json({ msg: "cart", success: true, cart });
};

export const getDishInfoQtyInput = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { dishId } = req.query;

  const dish = await Dish.findById(dishId);
  if (!dish) return baseErrResponse(res, 404, "No dish");

  return res.status(200).json({ msg: "Dish found", success: true, dish });
};
