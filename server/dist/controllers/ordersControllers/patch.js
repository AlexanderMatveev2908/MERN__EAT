var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { stripe } from "../../config/stripe.js";
import Restaurant from "../../models/Restaurant.js";
import Dish from "../../models/Dish.js";
export const refundOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.params;
    const order = (yield Order.findOne({
        _id: makeMongoId(orderId + ""),
        userId: makeMongoId(userId + ""),
    }));
    if (!order)
        return baseErrResponse(res, 404, "Order not found");
    if (order.status !== "confirmed")
        return baseErrResponse(res, 400, "Invalid status order");
    try {
        yield stripe.refunds.create({
            payment_intent: order.paymentId,
        });
        order.status = "cancelled";
        yield order.save();
    }
    catch (err) {
        return baseErrResponse(res, 500, "Refund failed");
    }
    const restaurant = yield Restaurant.findById(order.restaurantId);
    if (!restaurant)
        return res
            .status(200)
            .json({ message: "Refund successful, rest not found", success: true });
    let i = order.items.length - 1;
    do {
        const curr = order.items[i];
        const dish = (yield Dish.findById(curr.dishId));
        if (!dish) {
            i--;
            continue;
        }
        dish.quantity += curr.quantity;
        yield dish.save();
        i--;
    } while (i >= 0);
    return res
        .status(200)
        .json({ message: "Refund successful, rest update stock", success: true });
});
