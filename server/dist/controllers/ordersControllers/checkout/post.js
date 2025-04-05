var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cart from "../../../models/Cart.js";
import { makeMongoId } from "../../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../../utils/baseErrResponse.js";
import { createCouponHashed } from "../../../utils/coupon/generateCoupons.js";
import Coupon from "../../../models/Coupon.js";
import Dish from "../../../models/Dish.js";
import Restaurant from "../../../models/Restaurant.js";
import User from "../../../models/User.js";
import Order from "../../../models/Order.js";
import { uploadCloudURL } from "../../../utils/cloud.js";
import { createPaymentInt } from "../../../utils/stripe.js";
import { checkIsOpen } from "../../../utils/orders/refreshOrder.js";
// WHEN OPEN
// if (open <= currTime && close > currTime)
// else
// if (open === close)
// if (open <= currTime && close < open)
// if (close < open && close > currTime)
export const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { coupon } = req.body;
    const cart = (yield Cart.findOne({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    }).lean());
    if (!cart) {
        yield User.findByIdAndUpdate(userId, { $set: { cart: null } });
        return baseErrResponse(res, 404, "Cart not found");
    }
    const existingRestaurant = (yield Restaurant.findById(cart.restaurant));
    if (!existingRestaurant) {
        yield User.findByIdAndUpdate(userId, { $set: { cart: null } });
        yield Cart.findByIdAndDelete(cart._id);
        return baseErrResponse(res, 404, "Restaurant not found or activity closed");
    }
    if (!checkIsOpen(existingRestaurant))
        return baseErrResponse(res, 400, "Restaurant closed or would not make in time order");
    const orderItems = yield Promise.all(cart.items.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        const dish = (yield Dish.findById(el.dishId).lean());
        if (!dish || !dish.quantity)
            return null;
        return {
            name: dish.name,
            price: dish.price,
            dishId: dish._id,
            images: dish.images.map((el) => el.url),
            quantity: Math.min(el.quantity, dish.quantity),
        };
    }))).then((items) => items.filter((el) => !!el));
    const qtyUpToDate = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const cartQty = cart.items.reduce((acc, curr) => acc + curr.quantity, 0);
    if (qtyUpToDate !== cartQty) {
        if (!qtyUpToDate) {
            yield User.findByIdAndUpdate(userId, { $set: { cart: null } });
            yield Cart.findByIdAndDelete(cart._id);
            return baseErrResponse(res, 422, "Items not available or removed from menu");
        }
        else {
            const newCartItems = cart.items
                .map((cartEl) => {
                const orderItem = orderItems.find((orderEl) => orderEl.dishId + "" === cartEl.dishId + "");
                if (!(orderItem === null || orderItem === void 0 ? void 0 : orderItem.quantity))
                    return null;
                cartEl.quantity = orderItem.quantity;
                return cartEl;
            })
                .filter((el) => !!el);
            yield Cart.findByIdAndUpdate(cart._id, {
                $set: { items: newCartItems },
            });
            return baseErrResponse(res, 422, "Some items are not available anymore");
        }
    }
    try {
        yield Promise.all(orderItems.map((el) => __awaiter(void 0, void 0, void 0, function* () {
            el.images = (yield Promise.all(el.images.map((url) => __awaiter(void 0, void 0, void 0, function* () { return yield uploadCloudURL(url); }))));
        })));
    }
    catch (_a) { }
    if (orderItems.some((el) => el.images.some((el) => !(el === null || el === void 0 ? void 0 : el.public_id))))
        return baseErrResponse(res, 422, "Error cloud");
    // let j = orderItems.length - 1;
    // do {
    //   const curr = orderItems[j];
    //   for (let img of curr?.images as string[] | ImageType[]) {
    //     if (!(img as any)?.public_id) img = null as any;
    //   }
    //   j--;
    // } while (j >= 0);
    let totPrice = 0;
    let i = orderItems.length - 1;
    do {
        const curr = orderItems[i];
        totPrice += curr.price * curr.quantity;
        i--;
    } while (i >= 0);
    let couponSaved = null;
    if (coupon) {
        // IMPORTANT => I CAN DO THIS JUST CAUSE SHA256 AND HMAC ARE DETERMINISTIC SO SAME INPUT SAME RES, I COULD NOT DO IT WITH BCRYPT ARGON OR AN AES(ADVANCED ENCRYPTION STANDARD) THAT USUALLY USE AN ALGORITHM THAT INCLUDE THE RESPECT OF AVALANCHE PRINCIPLE TO NOT HAVE SAME RESULT FOR SAME PRINCIPLE
        const couponHashed = createCouponHashed(coupon);
        couponSaved = (yield Coupon.findOne({
            hashedCode: couponHashed,
        }));
        if (!couponSaved)
            return baseErrResponse(res, 404, "Coupon not found");
        //  i am trying to understand better status code and 422 of logical issues seems ok here
        if (!couponSaved.isActive)
            return baseErrResponse(res, 422, "Coupon already used or expired");
        if (new Date(couponSaved.expiryDate).getTime() < Date.now()) {
            couponSaved.isActive = false;
            yield couponSaved.save();
            return baseErrResponse(res, 422, "Coupon expired");
        }
        if (
        //  maybe would have more sense to check restaurant.some(el) but the concept somehow we could say there is
        !couponSaved.categories.some((el) => existingRestaurant.categories.includes(el)))
            return baseErrResponse(res, 422, "Coupon not valid for this restaurant category");
        if (totPrice < couponSaved.minCartPrice)
            return baseErrResponse(res, 400, "Amount to use coupon not reached");
    }
    const user = (yield User.findById(userId).lean());
    // save in vars cause too long names
    const freeMeal = existingRestaurant.delivery.freeDeliveryPrice;
    const delPrice = existingRestaurant.delivery.price;
    const needApplyDel = delPrice && totPrice < freeMeal;
    //  so i know if i need to apply or not del and save it in db so who watch know he also paid delivery out of tot price
    let discount = 0;
    if (couponSaved)
        discount = +((totPrice / 100) * couponSaved.discount).toFixed(2);
    const newOrder = {
        userId: user._id,
        restaurantId: existingRestaurant._id,
        restaurantName: existingRestaurant.name,
        infoUser: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        addressUser: user.address,
        items: orderItems,
        totPrice: +totPrice.toFixed(2),
        discount,
        delivery: needApplyDel ? delPrice : 0,
        coupon: couponSaved ? couponSaved._id : null,
        status: "pending",
    };
    const newMongoOrder = (yield Order.create(newOrder));
    if (!newMongoOrder)
        return baseErrResponse(res, 500, "Error creating order");
    const stripePrice = +(newMongoOrder.totPrice -
        newMongoOrder.discount +
        newMongoOrder.delivery).toFixed(2);
    const { paymentIntent } = yield createPaymentInt(stripePrice);
    if (!paymentIntent) {
        yield Order.findByIdAndDelete(newMongoOrder._id);
        return baseErrResponse(res, 500, "Error creating payment intent");
    }
    newMongoOrder.paymentId = paymentIntent.id;
    newMongoOrder.paymentClientSecret = paymentIntent.client_secret;
    yield Order.findByIdAndUpdate(newMongoOrder._id, newMongoOrder);
    if (couponSaved) {
        couponSaved.usedBy = user._id;
        couponSaved.usedFor = newMongoOrder._id;
        couponSaved.isActive = false;
        yield couponSaved.save();
    }
    yield Cart.findByIdAndDelete(cart._id);
    yield User.findByIdAndUpdate(userId, {
        $set: {
            cart: null,
        },
        $push: { orders: newMongoOrder._id },
    });
    existingRestaurant.orders.push(newMongoOrder._id);
    yield existingRestaurant.save();
    return res.status(201).json({
        msg: "Order created",
        success: true,
        orderId: newMongoOrder._id,
    });
});
/*
  // IMPORTANT => ALL COULD BE SKIP WITH DATE GET HOURS AND DATE GET MINUTES BUT I WANTED EXERCISE WORKING WITH DATES
  // ms from 1 jan 1970
  const open = existingRestaurant.openHours.openTime;
  const close = existingRestaurant.openHours.closeTime;
  const now = new Date();
  const mid = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    //  then hours minutes and sec
    0,
    0,
    0
  );
  // ms from 1970 - ms of midnight of ours day today => final res in minutes
  const currTime =
    (now.getTime() - mid.getTime()) / 1000 / 60 +
    existingRestaurant.delivery.estTimeDelivery;
  let isOpen = true;
  if (close !== open) {
    if (open < close) isOpen = currTime >= open && currTime < close;
    else isOpen = currTime >= open || currTime < close;
  }
  if (!isOpen)
    return baseErrResponse(
      res,
      400,
      "Restaurant closed or delivery time too long for his close time programmed"
    );
    */
