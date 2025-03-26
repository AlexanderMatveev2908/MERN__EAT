import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Cart, { CartItem, CartType } from "../../models/Cart.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import { HydratedDocument } from "mongoose";
import Dish from "../../models/Dish.js";
import Restaurant from "../../models/Restaurant.js";

export const incQtyCart = async (
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

  if ([dish, restaurant].some((el) => !el))
    return baseErrResponse(res, 404, "Rest or dish not found");

  let newCart = null;

  if (cart) {
    if (cart.restaurant + "" !== restaurant._id + "") return badRequest(res);

    const existingItem = cart.items.find((el) =>
      (el?.dishId as any).equals(makeMongoId(dishId as any))
    );
    if (existingItem) {
      cart.items = [
        ...cart.items.map((el) =>
          el.dishId + "" === dishId + ""
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
  }

  if (!newCart) await cart.save();

  return res.status(200).json({
    msg: "It went well",
    success: true,
  });
};
