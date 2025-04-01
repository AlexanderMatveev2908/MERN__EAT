import { Request, Response } from "express";
import { badRequest, baseErrResponse } from "../utils/baseErrResponse.js";
import { stripe } from "../config/stripe.js";
import { isDev } from "../config/currMode.js";
import Stripe from "stripe";
import Order, { OrderType } from "../models/Order.js";
import { HydratedDocument } from "mongoose";
import Restaurant from "../models/Restaurant.js";

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
  console.log(paymentStatus);
  const order = (await Order.findOne({
    paymentClientSecret: paymentInt.client_secret,
    paymentId: paymentInt.id,
  })) as HydratedDocument<OrderType> | null;

  if (!order) return baseErrResponse(res, 404, "Order not found");

  if (paymentStatus === "succeeded") {
    order.status = "confirmed";

    const restaurant = await Restaurant.findById(order.restaurantId);
    if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");

    restaurant.orders.push(order._id);
    await restaurant.save();
  }
  await order.save();

  return res.status(200).json({ received: true });
};
