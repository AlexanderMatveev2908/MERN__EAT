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
import Coupon from "../../../models/Coupon.js";
import Order from "../../../models/Order.js";
import Restaurant from "../../../models/Restaurant.js";
import User from "../../../models/User.js";
import { baseErrResponse } from "../../../utils/baseErrResponse.js";
import { checkDataExistOrder, checkIsOpen, getFreshItemsStock, } from "../../../utils/orders/refreshOrder.js";
export const lastCheckOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const _b = req.body, { email, firstName, lastName } = _b, address = __rest(_b, ["email", "firstName", "lastName"]);
    const result = yield checkDataExistOrder(req, res);
    if (!result)
        return;
    const { restaurant, order } = result;
    if ((order === null || order === void 0 ? void 0 : order.status) !== "pending")
        return baseErrResponse(res, 400, "Order is not pending");
    if (!checkIsOpen(restaurant))
        return baseErrResponse(res, 400, "Restaurant closed or would not make in time order");
    const { oldQty, newQty } = yield getFreshItemsStock(order);
    if (oldQty !== newQty) {
        yield User.findByIdAndUpdate(userId, {
            $pull: { orders: order._id },
        });
        yield Order.findByIdAndDelete(order._id);
        yield Restaurant.findByIdAndUpdate(restaurant._id, {
            $pull: { orders: order._id },
        });
        if (order.coupon) {
            const coupon = (yield Coupon.findById(order.coupon));
            if (coupon) {
                const isStillValid = new Date((_a = coupon.expiryDate) !== null && _a !== void 0 ? _a : 0).getTime() > Date.now();
                if (!isStillValid) {
                    coupon.isActive = false;
                    yield coupon.save();
                }
            }
        }
        return baseErrResponse(res, 400, "Some items are not available anymore");
    }
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
