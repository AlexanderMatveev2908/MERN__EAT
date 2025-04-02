var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { badRequest, baseErrResponse } from "../utils/baseErrResponse.js";
import { stripe } from "../config/stripe.js";
import { isDev } from "../config/currMode.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
export const webhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    if (!sig)
        return badRequest(res);
    let e;
    try {
        e = stripe.webhooks.constructEvent(req.body, sig, isDev ? process.env.STRIPE_SIGN_DEV : process.env.STRIPE_SIGN);
    }
    catch (_a) {
        return badRequest(res);
    }
    const paymentInt = e.data.object;
    const paymentStatus = paymentInt.status;
    const order = (yield Order.findOne({
        paymentClientSecret: paymentInt.client_secret,
        paymentId: paymentInt.id,
    }));
    if (!order)
        return baseErrResponse(res, 404, "Order not found");
    if (paymentStatus === "succeeded") {
        order.status = "confirmed";
        const restaurant = yield Restaurant.findById(order.restaurantId);
        if (!restaurant)
            return baseErrResponse(res, 404, "Restaurant not found");
        restaurant.orders.push(order._id);
        yield restaurant.save();
    }
    yield order.save();
    return res.status(200).json({ received: true });
});
