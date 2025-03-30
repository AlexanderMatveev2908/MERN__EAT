import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Cart, { CartItem, CartType } from "../../models/Cart.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish from "../../models/Dish.js";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { REG_QTY } from "../../config/constants/regex.js";

const lookForItemsQty = async (req: RequestWithUserId) => {
  const { userId } = req;
  const { cart } = req.body;

  const newCart: Partial<CartType> = {
    user: userId as string,
    restaurant: cart.restaurant,
    items: [],
  };

  let i = 0;
  do {
    const curr = cart.items[i];

    const dish = await Dish.findById(curr.dishId);
    if (!dish || !dish.quantity) continue;

    newCart?.items?.push({
      name: dish.name,
      price: dish.price,
      dishId: dish._id,
      quantity: curr.quantity > dish.quantity ? dish.quantity : curr.quantity,
    });

    i++;
  } while (i < cart.items.length);

  return { newCart };
};

export const switchCartLogged = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { dishId } = req.query;

  const cart = await Cart.findOne({
    user: makeMongoId(userId ?? ""),
  });

  const dish = await Dish.findById(dishId);
  if (!dishId) return baseErrResponse(res, 404, "Dish not found");
  if (!dish.quantity) return baseErrResponse(res, 400, "Dish not available");

  const restaurant = await Restaurant.findById(dish.restaurant);
  if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");

  if (cart) {
    const deletedCart = await cart.deleteOne();
    if (deletedCart.deletedCount !== 1)
      return baseErrResponse(res, 500, "Error deleting cart");
  }

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

export const switchCartFromLocalStorage = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { cart } = req.body;

  const existingCart = await Cart.findOne({ user: makeMongoId(userId ?? "") });
  if (!existingCart) return baseErrResponse(res, 404, "Cart not found");

  const { newCart } = await lookForItemsQty(req);

  if (!newCart?.items?.length)
    return res.status(422).json({ msg: "Items not available", success: true });

  const count = await Cart.deleteOne({ user: makeMongoId(userId ?? "") });
  if (count.deletedCount !== 1)
    return baseErrResponse(res, 500, "Error deleting cart");

  const newMongoCart = await Cart.create(newCart);
  await User.findByIdAndUpdate(userId, { cart: newMongoCart._id });

  return res.status(200).json({ msg: "Cart replaced", success: true });
};

export const saveDbStorageCart = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const existingCart = await Cart.findOne({ user: makeMongoId(userId ?? "") });
  if (existingCart) return badRequest(res);

  const { newCart } = await lookForItemsQty(req);

  if (!newCart?.items?.length)
    return baseErrResponse(
      res,
      422,
      "Dishes not currently available or removed"
    );

  const newMongoCart = await Cart.create(newCart);
  await User.findByIdAndUpdate(userId, { cart: newMongoCart._id });

  return res.status(201).json({ msg: "Cart saved", success: true });
};
