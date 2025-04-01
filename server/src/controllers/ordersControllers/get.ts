import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderItem, OrderType } from "../../models/Order.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import Dish, { DishType } from "../../models/Dish.js";
import User from "../../models/User.js";
import { ImageType } from "../../models/Image.js";
import { deleteCloud } from "../../utils/cloud.js";
import Coupon, { CouponType } from "../../models/Coupon.js";
import { createPaymentInt } from "../../utils/stripe.js";

export const getOrderInfo = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.query;

  const order = (await Order.findOne({
    _id: makeMongoId(orderId as string),
    userId: makeMongoId(userId as string),
  }).lean()) as unknown as OrderType;

  if (!order) {
    await User.findByIdAndUpdate(userId, {
      $pull: { orders: makeMongoId(orderId as string) },
    });

    return baseErrResponse(res, 404, "Order not found");
  }
  const restaurant = (await Restaurant.findById(
    order.restaurantId
  ).lean()) as RestaurantType | null;
  if (!restaurant) {
    await Order.findByIdAndDelete(order._id);
    await User.findByIdAndUpdate(userId, {
      $pull: { orders: order._id },
    });

    return baseErrResponse(res, 404, "Restaurant not found");
  }

  let isOpen = true;

  const open = restaurant.openHours.openTime;
  const close = restaurant.openHours.closeTime;
  const now =
    new Date().getHours() * 60 +
    new Date().getMinutes() +
    restaurant.delivery.estTimeDelivery;

  if (open !== close) {
    if (open < close) isOpen = now >= open && now < close;
    else isOpen = now >= open || now < close;
  }
  if (!isOpen)
    return baseErrResponse(
      res,
      400,
      "Restaurant closed or would not make in time order"
    );

  const orderItemsFresh: OrderItem[] = [];

  const promises = order.items.map(async (el: OrderItem) => {
    // i search in dish collection cause is possible i forgot to update restaurant document ref, my fault, when i will be sure is all sync i will refactor code so i do not do unnecessary DB call
    const dish = (await Dish.findById(el.dishId).lean()) as unknown as DishType;
    if (!dish || !dish.quantity) return;

    orderItemsFresh.push({
      ...el,
      quantity: Math.min(el.quantity, dish.quantity),
    });
  });

  await Promise.all(promises);

  const newQty = orderItemsFresh.reduce(
    (acc, curr: OrderItem) => acc + curr.quantity,
    0
  );
  const oldQty = order.items.reduce(
    (acc: number, curr: OrderItem) => acc + curr.quantity,
    0
  );

  if (newQty === oldQty) {
    if (order.paymentId && order.paymentClientSecret) {
      return res.status(200).json({
        order,
        success: true,
        msg: "Ok the same",
      });
    } else {
      const stripePrice = +(
        order.totPrice +
        order.delivery -
        order.discount
      ).toFixed(2);

      const { paymentIntent: newPaymentIntent } = await createPaymentInt(
        stripePrice
      );
      if (!newPaymentIntent)
        return baseErrResponse(res, 500, "Error creating payment");

      order.paymentId = newPaymentIntent.id;
      order.paymentClientSecret = newPaymentIntent.client_secret;

      await Order.findByIdAndUpdate(order._id, order);

      return res.status(200).json({
        order,
        success: true,
        msg: "Ok the same, added stripe",
      });
    }
  } else {
    let coupon = null;
    let isStillValid = true;
    let isPriceCOndOk = true;
    let resetCoupon = false;
    let expiredCoupon = false;

    if (order.coupon)
      coupon = (await Coupon.findOne({
        usedBy: makeMongoId(userId ?? ""),
        usedFor: order._id,
      }).lean()) as CouponType | null;
    if (coupon)
      isStillValid = new Date(coupon.expiryDate).getTime() > Date.now();

    if (!orderItemsFresh.length) {
      if (coupon && isStillValid)
        await Coupon.findByIdAndUpdate(coupon._id, { isActive: true });

      await Order.findByIdAndDelete(order._id);
      await User.findByIdAndUpdate(userId, {
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

    let newTotPrice = orderItemsFresh.reduce(
      (acc, curr: OrderItem) => acc + curr.quantity * curr.quantity,
      0
    );

    const discount = coupon
      ? newTotPrice - (newTotPrice / 100) * coupon.discount
      : 0;
    const delPrice = restaurant.delivery.price;
    const delFree = restaurant.delivery.freeDeliveryPrice;
    let needApplyDel = false;

    if (delPrice && newTotPrice < delFree) needApplyDel = true;

    if (coupon) {
      isPriceCOndOk = newTotPrice >= coupon.minCartPrice;

      if (!isPriceCOndOk && isStillValid) {
        resetCoupon = true;

        if (!coupon.isActive)
          await Coupon.findByIdAndUpdate(coupon._id, {
            isActive: true,
          });
      }
      if (!isStillValid) {
        expiredCoupon = true;

        if (coupon.isActive)
          await Coupon.findByIdAndUpdate(coupon._id, {
            isActive: false,
          });
      }
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

    const canApplyCoupon = coupon && !resetCoupon && !expiredCoupon;

    const updatedOrder = {
      ...order,
      paymentId: newPaymentIntent.id,
      paymentClientSecret: newPaymentIntent.client_secret,

      items: orderItemsFresh,
      priceNoDiscount: +newTotPrice.toFixed(2),
      priceWithDiscount: canApplyCoupon ? stripePrice : null,
      coupon: canApplyCoupon ? ((coupon as CouponType)._id as string) : null,
      delivery: needApplyDel ? restaurant.delivery.price : null,
    };

    await Order.findByIdAndUpdate(order._id, updatedOrder);

    return res.status(200).json({
      order: updatedOrder,
      success: true,
      msg: "Changed",
      resetCoupon,
      expiredCoupon,
    });
  }
};
