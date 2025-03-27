import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Cart from "../../models/Cart.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish from "../../models/Dish.js";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { REG_QTY } from "../../config/constants/regex.js";

export const switchCartLogged = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { dishId } = req.query;

  const cart = await Cart.findOne({
    user: makeMongoId(userId ?? ""),
  });
  if (!cart) return badRequest(res);

  const dish = await Dish.findById(dishId);
  if (!dishId) return baseErrResponse(res, 404, "Dish not found");
  if (!dish.quantity) return badRequest(res);

  const restaurant = await Restaurant.findById(dish.restaurant);
  if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");

  const deletedCart = await cart.deleteOne();
  if (deletedCart.deletedCount !== 1)
    return baseErrResponse(res, 500, "Error deleting cart");

  const newCart = await Cart.create({
    user: userId,
    restaurant: restaurant._id,
    items: [
      {
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      },
    ],
  });

  await User.findByIdAndUpdate(userId, { cart: newCart });

  return res.status(200).json({ msg: "Cart updated", success: true });
};
