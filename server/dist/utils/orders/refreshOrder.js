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
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { baseErrResponse } from "../baseErrResponse.js";
import { makeMongoId } from "../dbPipeline/general.js";
import Dish from "../../models/Dish.js";
import Coupon from "../../models/Coupon.js";
export const checkIsOpen = (rest) => {
    let isOpen = true;
    const open = rest.openHours.openTime;
    const close = rest.openHours.closeTime;
    const now = new Date().getHours() * 60 +
        new Date().getMinutes() +
        rest.delivery.estTimeDelivery;
    if (open !== close) {
        if (open < close)
            isOpen = now >= open && now < close;
        else
            isOpen = now >= open || now < close;
    }
    return isOpen;
};
export const checkDataExistOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.query;
    try {
        const order = (yield Order.findOne({
            _id: makeMongoId(orderId),
            userId: makeMongoId(userId),
        }).lean());
        if (!order) {
            yield User.findByIdAndUpdate(userId, {
                $pull: { orders: makeMongoId(orderId) },
            });
            throw new Error("Order not found");
        }
        const restaurant = (yield Restaurant.findById(order.restaurantId).lean());
        if (!restaurant) {
            yield Order.findByIdAndDelete(order._id);
            yield User.findByIdAndUpdate(userId, {
                $pull: { orders: order._id },
            });
            throw new Error("Restaurant not found");
        }
        return {
            order,
            restaurant,
        };
    }
    catch (err) {
        return baseErrResponse(res, 404, err.message);
    }
});
export const getFreshItemsStock = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemsFresh = yield Promise.all(order.items.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        const dish = (yield Dish.findById(el.dishId).lean());
        if (!dish || !dish.quantity)
            return null;
        return Object.assign(Object.assign({}, el), { quantity: Math.min(el.quantity, dish.quantity) });
    }))).then((items) => items.filter((el) => !!el));
    const newQty = orderItemsFresh.reduce((acc, curr) => acc + curr.quantity, 0);
    const oldQty = order.items.reduce((acc, curr) => acc + curr.quantity, 0);
    return { orderItemsFresh, oldQty, newQty };
});
export const handleCouponOrder = (coupon, newTotPrice, orderItemsFresh) => __awaiter(void 0, void 0, void 0, function* () {
    let resetCoupon = false;
    let expiredCoupon = false;
    let discount = 0;
    const isPriceCOndOk = newTotPrice >= coupon.minCartPrice;
    const isStillValid = new Date(coupon.expiryDate).getTime() > Date.now();
    if ((!isPriceCOndOk || !orderItemsFresh.length) && isStillValid) {
        resetCoupon = true;
        yield Coupon.findByIdAndUpdate(coupon._id, {
            isActive: true,
        });
    }
    else if (!isStillValid) {
        expiredCoupon = true;
        yield Coupon.findByIdAndUpdate(coupon._id, {
            isActive: false,
        });
    }
    else {
        discount = +((newTotPrice / 100) * coupon.discount).toFixed(2);
    }
    return {
        resetCoupon,
        expiredCoupon,
        discount,
    };
});
