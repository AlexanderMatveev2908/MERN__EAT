import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderItem, OrderType } from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { stripe } from "../../config/stripe.js";
import Restaurant from "../../models/Restaurant.js";
import Dish, { DishType } from "../../models/Dish.js";
import { HydratedDocument } from "mongoose";

export const refundOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.params;

  const order = (await Order.findOne({
    _id: makeMongoId(orderId + ""),
    userId: makeMongoId(userId + ""),
  })) as HydratedDocument<OrderType> | null;
  if (!order) return baseErrResponse(res, 404, "Order not found");

  if (order.status !== "confirmed")
    return baseErrResponse(res, 400, "Order is already being processing");

  try {
    const refund = await stripe.refunds.create({
      payment_intent: order.paymentId as string,
    });

    order.status = "cancelled";
    await order.save();
  } catch (err) {
    console.log(err);
    return baseErrResponse(res, 500, "Refund failed");
  }

  const restaurant = await Restaurant.findById(order.restaurantId);

  if (!restaurant)
    return res
      .status(200)
      .json({ message: "Refund successful, rest not found", success: true });

  let i = order.items.length - 1;

  do {
    const curr = order.items[i] as OrderItem;

    const dish = (await Dish.findById(
      curr.dishId
    )) as HydratedDocument<DishType> | null;

    if (!dish) {
      i--;
      continue;
    }

    dish.quantity += curr.quantity;
    await dish.save();

    i--;
  } while (i >= 0);

  return res
    .status(200)
    .json({ message: "Refund successful, rest update stock", success: true });
};
