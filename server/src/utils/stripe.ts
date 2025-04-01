import { stripe } from "../config/stripe.js";
import Stripe from "stripe";

export const createPaymentInt = async (stripePrice: number): Promise<any> => {
  let paymentIntent: Stripe.PaymentIntent | null = null;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: stripePrice * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });
  } catch (err) {}

  return { paymentIntent };
};
