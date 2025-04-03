import { Request, Response } from "express";
import { badRequest, baseErrResponse } from "../utils/baseErrResponse.js";
import { stripe } from "../config/stripe.js";
import { isDev } from "../config/currMode.js";
import Stripe from "stripe";
import Order, { OrderItem, OrderType } from "../models/Order.js";
import { HydratedDocument } from "mongoose";
import Restaurant from "../models/Restaurant.js";
import Dish, { DishType } from "../models/Dish.js";

export const webhook = async (req: Request, res: Response): Promise<any> => {
  const sig = req.headers["stripe-signature"];

  if (!sig) return badRequest(res);

  let e: Stripe.Event;

  try {
    e = stripe.webhooks.constructEvent(
      req.body,
      sig,
      isDev ? process.env.STRIPE_SIGN_DEV! : process.env.STRIPE_SIGN!
    );
  } catch {
    return badRequest(res);
  }

  const paymentInt = e.data.object as Stripe.PaymentIntent;
  const paymentStatus = paymentInt.status;

  const order = (await Order.findOne({
    paymentClientSecret: paymentInt.client_secret,
    paymentId: paymentInt.id,
  })) as HydratedDocument<OrderType> | null;

  if (!order) return baseErrResponse(res, 404, "Order not found");

  if (paymentStatus === "succeeded" && order.status === "pending") {
    await Order.findByIdAndUpdate(order._id, { $set: { status: "confirmed" } });

    const promises = order.items.map(async (el: OrderItem) => {
      const dish = (await Dish.findById(el.dishId).lean()) as DishType | null;
      //  i return just for tsc complain, i already checked in "getFreshItemsStock" that stock is ok and up to date
      if (!dish) return;

      dish.quantity -= el.quantity;
      await Dish.findByIdAndUpdate(el.dishId, {
        $set: { quantity: dish.quantity },
      });
    });

    await Promise.all(promises);
  }

  return res.status(200).json({ received: true });
};
