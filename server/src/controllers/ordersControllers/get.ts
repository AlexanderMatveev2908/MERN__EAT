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
import { stripe } from "../../config/stripe.js";

export const getOrderInfo = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.params;

  const order = (
    await Order.findOne({
      user: makeMongoId(userId ?? ""),
      _id: makeMongoId(orderId ?? ""),
    })
  ).lean() as OrderType | null;
  if (!order) {
    await User.findByIdAndUpdate(userId, {
      $pull: { orders: makeMongoId(orderId ?? "") },
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
      quantity: Math.max(el.quantity, dish.quantity),
    });
  });

  await Promise.all(promises);

  const newQty = orderItemsFresh.reduce(
    (acc, curr: OrderItem) => acc + curr.quantity,
    0
  );
  const oldQty = order.items.reduce(
    (acc, curr: OrderItem) => acc + curr.quantity,
    0
  );

  if (newQty === oldQty)
    return res.status(200).json({
      order,
      success: true,
      msg: "Ok the same",
    });
  else {
    if (!orderItemsFresh.length) {
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

    const promisesCloud = idsImagesToDelete.map(
      async (public_id: string) => await deleteCloud(public_id)
    );

    try {
      await Promise.all(promisesCloud);
    } catch {}

    let newTotPrice = orderItemsFresh.reduce(
      (acc, curr: OrderItem) => acc + curr.quantity * curr.quantity,
      0
    );

    let needApplyDel = false;
    let resetCoupon = false;
    let expiredCoupon = false;

    const delFree = restaurant.delivery.freeDeliveryPrice;

    if (delFree && newTotPrice < delFree) {
      needApplyDel = true;
      newTotPrice += restaurant.delivery.price;
    }

    let coupon = null;
    if (order.coupon)
      coupon = (await Coupon.findOne({
        usedBy: makeMongoId(userId ?? ""),
        usedFor: order._id,
      }).lean()) as CouponType | null;

    let stripePrice = newTotPrice;
    if (coupon) {
      const isStillValid = new Date(coupon.expiryDate).getTime() > Date.now();
      const isPriceCOndOk = newTotPrice >= coupon.minCartPrice;

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
      if (isPriceCOndOk && isStillValid) {
        stripePrice = +(newTotPrice - (newTotPrice / 100) * coupon.discount);
      }
    }
    stripePrice = +stripePrice.toFixed(2);

    const newPaymentIntent = await stripe.paymentIntents.create({
      amount: stripePrice * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

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
      msg: "Ok",
      resetCoupon,
      expiredCoupon,
    });
  }
};
