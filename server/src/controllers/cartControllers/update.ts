import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Cart, { CartItem, CartType } from "../../models/Cart.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import mongoose, { HydratedDocument } from "mongoose";
import Dish from "../../models/Dish.js";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { REG_QTY } from "../../config/constants/regex.js";

const getDataRequest = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { dishId } = req.query;

  const cart = (await Cart.findOne({
    user: makeMongoId(userId ?? ""),
  })) as HydratedDocument<CartType>;

  const dish = await Dish.findById(dishId);
  const restaurant = await Restaurant.findById(dish.restaurant);

  // if from frontend come a req about other dish from cart restaurant, then restaurant will not be found and i send 404 that implicit is 400
  if ([dish, restaurant].some((el) => !el))
    return baseErrResponse(res, 404, "Not found, bad req");

  return {
    cart,
    dish,
    restaurant,
    ok: true,
  };
};

export const incQtyCart = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { cart, dish, restaurant, ok } = await getDataRequest(req, res);
  if (!ok) return;

  if (!dish.quantity) return baseErrResponse(res, 400, "Bad req");

  let newCart = null;
  if (cart) {
    const existingItem = cart.items.find((el: CartItem) =>
      (el?.dishId as mongoose.Types.ObjectId).equals(dish._id)
    );
    if (existingItem) {
      if (existingItem.quantity + 1 > dish.quantity) return badRequest(res);

      cart.items = [
        ...cart.items.map((el: CartItem) =>
          el.dishId + "" === dish._id + ""
            ? {
                ...el,
                quantity: el.quantity + 1,
              }
            : el
        ),
      ];
    } else {
      cart.items.push({
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      } as CartItem);
    }
  } else {
    newCart = await Cart.create({
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
  }

  if (!newCart) await cart.save();

  return res.status(200).json({
    msg: "Item added to cart",
    success: true,
  });
};

export const decQtyCart = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { cart, dish, ok } = await getDataRequest(req, res);
  if (!ok) return;

  if (!cart) return badRequest(res);

  let deletedCart;

  const existingItem = cart.items.find(
    (el: CartItem) => el.dishId + "" === dish._id + ""
  );
  if (!existingItem)
    return baseErrResponse(res, 404, "Dish not found, bad req");

  if (existingItem.quantity > 1) {
    cart.items = cart.items.map((el: CartItem) =>
      el.dishId + "" === existingItem.dishId + ""
        ? {
            ...el,
            quantity: el.quantity - 1,
          }
        : el
    );
  } else {
    if (cart.items.length > 1) {
      cart.items = cart.items.filter(
        (el: HydratedDocument<CartItem>) =>
          !(el.dishId as mongoose.Types.ObjectId).equals(existingItem.dishId)
      );
    } else {
      deletedCart = await Cart.findByIdAndDelete(cart._id);
      await User.findByIdAndUpdate(userId, { cart: null });
    }
  }

  if (!deletedCart) await cart.save();

  return res.status(200).json({
    success: true,
    msg: `Item removed ${existingItem.quantity > 1 ? "" : "from cart"}`,
  });
};

export const delItem = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { cart, dish, ok } = await getDataRequest(req, res);
  if (!ok) return;
  if (!cart) return badRequest(res);

  let deletedCart;

  if (cart.items.length > 1) {
    cart.items = cart.items.filter(
      (el: CartItem) => el.dishId + "" !== dish._id + ""
    );
  } else {
    deletedCart = await cart.deleteOne();
    await User.findByIdAndUpdate(userId, { cart: null });
  }

  if (!deletedCart?.deletedCount) await cart.save();

  return res.status(200).json({ success: true, msg: "Item removed from cart" });
};

export const delCart = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const cartDeleted = await Cart.findOneAndDelete({
    user: makeMongoId(userId ?? ""),
  });
  if (!cartDeleted) return baseErrResponse(res, 404, "Cart not found, bad req");

  return res.status(200).json({ msg: "Cart deleted", success: true });
};

export const updateQtyByInput = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { quantity } = req.body;

  if (!REG_QTY.test(quantity)) return badRequest(res);

  const { cart, dish, ok } = await getDataRequest(req, res);
  if (!ok) return;
  if (!cart) return badRequest(res);

  const existingItem = cart.items.find(
    (el: CartItem) => el.dishId + "" === dish._id + ""
  );
  if (!existingItem) return badRequest(res);
  if (dish.quantity < +quantity)
    return baseErrResponse(res, 400, "Qty not avl");

  cart.items = cart.items.map((el: CartItem) =>
    el.dishId + "" === existingItem.dishId + ""
      ? {
          ...el,
          quantity,
        }
      : el
  );

  await cart.save();

  return res.status(200).json({ success: true, msg: "Cart updated" });
};
