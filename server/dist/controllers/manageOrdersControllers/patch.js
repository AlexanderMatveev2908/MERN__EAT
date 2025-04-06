var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Restaurant from "../../models/Restaurant.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse, unauthorizedErr, } from "../../utils/baseErrResponse.js";
import Order, { ordersStatusArr } from "../../models/Order.js";
const updatableStatus = ordersStatusArr.slice(0, ordersStatusArr.length - 1);
export const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.params;
    const { status } = req.body;
    const restaurants = yield Restaurant.find({
        owner: makeMongoId(userId),
    });
    if (!restaurants.length)
        return unauthorizedErr(res, "No restaurants so no right update orders");
    const order = (yield Order.findOne({
        _id: makeMongoId(orderId),
        restaurantId: { $in: restaurants.map((el) => el._id) },
    }));
    if (!order)
        return baseErrResponse(res, 404, "Order not found");
    if (["pending", "cancelled", "delivered"].includes(order.status))
        return badRequest(res);
    if (status === "cancelled")
        return badRequest(res);
    const oldI = updatableStatus.findIndex((el) => el === order.status);
    const newI = updatableStatus.findIndex((el) => el === status);
    if (newI <= oldI)
        return baseErrResponse(res, 400, "Rollback status not allowed");
    order.status = status;
    yield order.save();
    return res
        .status(200)
        .json({ message: "Order status updated", success: true });
});
