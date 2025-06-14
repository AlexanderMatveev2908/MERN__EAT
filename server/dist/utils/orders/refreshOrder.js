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
import Order from "../../models/Order.js";
import Restaurant from "../../models/Restaurant.js";
import Dish from "../../models/Dish.js";
import Coupon from "../../models/Coupon.js";
import { deleteCloud } from "../cloud.js";
import User from "../../models/User.js";
import Cart from "../../models/Cart.js";
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
export const clearOrder = (res, order, restaurant, orderItemsFresh) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const msg = `${restaurant
        ? `${(orderItemsFresh === null || orderItemsFresh === void 0 ? void 0 : orderItemsFresh.length)
            ? "Some items are not available anymore or removed from menu"
            : "Items not available or removed from menu"}`
        : "Restaurant not found or business activity closed "}`;
    let remakeCart = false;
    const user = (yield User.findById(order.userId));
    if (restaurant) {
        yield Restaurant.findByIdAndUpdate(restaurant._id, {
            $pull: { orders: order._id },
        });
        if (!(user === null || user === void 0 ? void 0 : user.cart) && (orderItemsFresh === null || orderItemsFresh === void 0 ? void 0 : orderItemsFresh.length)) {
            let totQty = 0;
            let totPrice = 0;
            const cartItems = [];
            let i = 0;
            do {
                const curr = orderItemsFresh[i];
                totQty += curr.quantity;
                totPrice += curr.quantity * curr.price;
                const { images } = curr, rest = __rest(curr, ["images"]);
                cartItems.push(rest);
                i++;
            } while (i < orderItemsFresh.length);
            const newMongoCart = (yield Cart.create({
                restaurant: restaurant._id,
                user: order.userId,
                items: cartItems,
                totQty,
                totPrice: +totPrice.toFixed(2),
            }));
            if (newMongoCart) {
                remakeCart = true;
                user.cart = newMongoCart._id;
                yield user.save();
            }
        }
    }
    try {
        yield Promise.all(order.items
            .map((el) => el.images.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(el.public_id); })))
            .flat(Infinity));
    }
    catch (_b) { }
    yield Order.findByIdAndDelete(order._id);
    user.orders = user.orders.filter((el) => el + "" !== order._id + "");
    yield user.save();
    if (!order.coupon)
        return res.status(422).json({
            msg,
            success: false,
            restId: restaurant === null || restaurant === void 0 ? void 0 : restaurant._id,
            remakeCart,
        });
    const coupon = yield Coupon.findById(order.coupon);
    const isStillValid = new Date((_a = coupon === null || coupon === void 0 ? void 0 : coupon.expiryDate) !== null && _a !== void 0 ? _a : 0).getTime() > Date.now();
    if (coupon) {
        coupon.usedBy = null;
        coupon.usedFor = null;
        if (isStillValid)
            coupon.isActive = true;
        yield coupon.save();
    }
    return res.status(404).json({
        msg,
        success: false,
        resetCoupon: isStillValid,
        restId: restaurant === null || restaurant === void 0 ? void 0 : restaurant._id,
        remakeCart,
    });
});
