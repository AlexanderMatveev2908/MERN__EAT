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
import User from "../../models/User.js";
import Restaurant from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { deleteCloud } from "../../utils/cloud.js";
export const deletePendingOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.params;
    const order = yield Order.findOne({
        userId: makeMongoId(userId),
        _id: makeMongoId(orderId),
    });
    if (!order)
        return baseErrResponse(res, 404, "Order not found");
    if (order.status !== "pending")
        return baseErrResponse(res, 400, "Order is not pending");
    try {
        yield Promise.all(order.items
            .map((el) => el.images.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(el.public_id); })))
            .flat(Infinity));
    }
    catch (_a) { }
    yield User.findByIdAndUpdate(userId, {
        $pull: { orders: makeMongoId(orderId) },
    });
    yield Restaurant.findOneAndUpdate({ orders: makeMongoId(orderId) }, { $pull: { orders: makeMongoId(orderId) } });
    yield Order.findByIdAndDelete(orderId);
    return res.status(204).end();
});
