var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Order from "../../../models/Order.js";
import Restaurant from "../../../models/Restaurant.js";
import User from "../../../models/User.js";
import { baseErrResponse } from "../../../utils/baseErrResponse.js";
import { checkIsOpen, clearOrder, getFreshItemsStock, } from "../../../utils/orders/refreshOrder.js";
import { makeMongoId } from "../../../utils/dbPipeline/general.js";
export const lastCheckOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.query;
    const _a = req.body, { email, firstName, lastName } = _a, address = __rest(_a, ["email", "firstName", "lastName"]);
    const order = (yield Order.findOne({
        _id: makeMongoId(orderId),
        userId: makeMongoId(userId),
    }).lean());
    if (!order) {
        yield User.findByIdAndUpdate(userId, {
            $pull: { orders: makeMongoId(orderId) },
        });
        yield Restaurant.findOneAndUpdate({ orders: makeMongoId(orderId) }, { $pull: { orders: makeMongoId(orderId) } });
        return baseErrResponse(res, 404, "Order not found");
    }
    const restaurant = (yield Restaurant.findById(order.restaurantId).lean());
    if (!restaurant)
        return clearOrder(res, order);
    if ((order === null || order === void 0 ? void 0 : order.status) !== "pending")
        return baseErrResponse(res, 400, "Order is not pending");
    if (!checkIsOpen(restaurant))
        return baseErrResponse(res, 400, "Restaurant closed or would not make in time order");
    const { orderItemsFresh, oldQty, newQty } = yield getFreshItemsStock(order);
    if (oldQty !== newQty)
        return clearOrder(res, order, restaurant, orderItemsFresh);
    yield Order.findByIdAndUpdate(order._id, {
        $set: {
            addressUser: address,
            "infoUser.email": email,
            "infoUser.firstName": firstName,
            "infoUser.lastName": lastName,
        },
    });
    return res.status(200).json({
        success: true,
        message: "Order updated successfully",
    });
});
