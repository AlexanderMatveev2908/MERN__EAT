var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../../../models/Order.js";
import { baseErrResponse } from "../../../utils/baseErrResponse.js";
import Restaurant from "../../../models/Restaurant.js";
import { makeMongoId } from "../../../utils/dbPipeline/general.js";
import User from "../../../models/User.js";
import { createPaymentInt } from "../../../utils/stripe.js";
import { checkIsOpen, clearOrder, getFreshItemsStock, } from "../../../utils/orders/refreshOrder.js";
import { stripe } from "../../../config/stripe.js";
export const getOrderInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { orderId } = req.query;
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
    if (order.status !== "pending")
        return baseErrResponse(res, 400, "Order is not pending");
    if (!checkIsOpen(restaurant))
        return baseErrResponse(res, 400, "Restaurant closed or would not make in time order");
    const { orderItemsFresh, oldQty, newQty } = yield getFreshItemsStock(order);
    if (newQty !== oldQty)
        return clearOrder(res, order, restaurant, orderItemsFresh);
    const existingPaymentInt = yield stripe.paymentIntents.retrieve((_a = order.paymentId) !== null && _a !== void 0 ? _a : "");
    if (existingPaymentInt) {
        return res.status(200).json({
            order,
            success: true,
            backPaymentInt: existingPaymentInt,
            msg: "Ok the same",
        });
    }
    else {
        const stripePrice = +(order.totPrice +
            order.delivery -
            order.discount).toFixed(2);
        const { paymentIntent: newPaymentIntent } = yield createPaymentInt(stripePrice);
        if (!newPaymentIntent)
            return baseErrResponse(res, 500, "Error creating payment");
        order.paymentId = newPaymentIntent.id;
        order.paymentClientSecret = newPaymentIntent.client_secret;
        yield Order.findByIdAndUpdate(order._id, order);
        return res.status(200).json({
            order,
            success: true,
            msg: "Ok the same, added stripe",
            backPaymentInt: newPaymentIntent,
        });
    }
});
export const getOrderConfirmedByPolling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.query;
    const order = yield Order.findOne({
        userId: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
        _id: makeMongoId(orderId),
        status: "confirmed",
    }).lean();
    if (!order)
        return baseErrResponse(res, 404, "Order not found");
    return res.status(200).json({ order, success: true, msg: "Order confirmed" });
});
/*
    if (!orderItemsFresh.length) {
      await Order.findByIdAndDelete(order._id);
      await User.findByIdAndUpdate(userId, {
        $pull: { orders: order._id },
      });
      await Restaurant.findByIdAndUpdate(restaurant._id, {
        $pull: { orders: order._id },
      });
      return baseErrResponse(
        res,
        422,
        "Dishes not available or removed from menu"
      );
    }

    const idsImagesToDelete = order.items
      .filter(
        (old: OrderItem) =>
          ![...orderItemsFresh.map((fresh) => fresh.dishId + "")].includes(
            old.dishId + ""
          )
      )
      .map((filtered: OrderItem) =>
        filtered.images.map((img: ImageType) => img.public_id)
      )
      .flat(Infinity) as unknown as string[];
    if (idsImagesToDelete.length) {
      const promisesCloud = idsImagesToDelete.map(
        async (public_id: string) => await deleteCloud(public_id)
      );
      try {
        await Promise.all(promisesCloud);
      } catch {}
    }

    const delPrice = restaurant.delivery.price;
    const delFree = restaurant.delivery.freeDeliveryPrice;
    let newTotPrice = orderItemsFresh.reduce(
      (acc, curr: OrderItem) => acc + curr.quantity * curr.quantity,
      0
    );
    let coupon: CouponType | null = null;
    let needApplyDel = false;
    let discount = 0;
    let resetCoupon = false;
    let expiredCoupon = false;

    if (delPrice && newTotPrice < delFree) needApplyDel = true;

    if (order.coupon) {
      coupon = await Coupon.findById(order.coupon);
      if (!coupon) return baseErrResponse(res, 404, "Coupon not found");

      ({ resetCoupon, expiredCoupon, discount } = await handleCouponOrder(
        coupon,
        newTotPrice,
        orderItemsFresh
      ));
    }

    const stripePrice = +(
      newTotPrice -
      discount +
      (needApplyDel ? delPrice : 0)
    ).toFixed(2);
    const { paymentIntent: newPaymentIntent } = await createPaymentInt(
      stripePrice
    );
    if (!newPaymentIntent)
      return baseErrResponse(res, 500, "Error creating payment");

    const updatedOrder: OrderType = {
      ...order,
      paymentId: newPaymentIntent.id,
      paymentClientSecret: newPaymentIntent.client_secret,

      items: orderItemsFresh,
      totPrice: +newTotPrice.toFixed(2),
      discount,
      coupon: coupon ? ((coupon as CouponType)._id as string) : null,
      delivery: needApplyDel ? delPrice : 0,
    };

    await Order.findByIdAndUpdate(order._id, updatedOrder);

    return res.status(200).json({
      order: updatedOrder,
      success: true,
      msg: "Changed",
      resetCoupon,
      expiredCoupon,
      backPaymentInt: newPaymentIntent,
    });
    */
