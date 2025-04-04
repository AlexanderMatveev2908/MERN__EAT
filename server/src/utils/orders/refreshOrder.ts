import Order, { OrderItem, OrderType } from "../../models/Order.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";

import Dish, { DishType } from "../../models/Dish.js";
import Coupon, { CouponType } from "../../models/Coupon.js";
import { stripe } from "../../config/stripe.js";
import { ImageType } from "../../models/Image.js";
import { deleteCloud } from "../cloud.js";
import User from "../../models/User.js";
import { HydratedDocument } from "mongoose";
import { baseErrResponse } from "../baseErrResponse.js";
import { Response } from "express";

export const checkIsOpen = (rest: RestaurantType) => {
  let isOpen = true;

  const open = rest.openHours.openTime;
  const close = rest.openHours.closeTime;
  const now =
    new Date().getHours() * 60 +
    new Date().getMinutes() +
    rest.delivery.estTimeDelivery;

  if (open !== close) {
    if (open < close) isOpen = now >= open && now < close;
    else isOpen = now >= open || now < close;
  }

  return isOpen;
};

export const getFreshItemsStock = async (order: OrderType) => {
  const orderItemsFresh: OrderItem[] = await Promise.all(
    order.items.map(async (el: OrderItem) => {
      const dish = (await Dish.findById(el.dishId).lean()) as DishType | null;
      if (!dish || !dish.quantity) return null;

      return {
        ...el,
        quantity: Math.min(el.quantity, dish.quantity),
      };
    })
  ).then((items) => items.filter((el) => !!el));

  const newQty = orderItemsFresh.reduce(
    (acc, curr: OrderItem) => acc + curr.quantity,
    0
  );
  const oldQty = order.items.reduce(
    (acc: number, curr: OrderItem) => acc + curr.quantity,
    0
  );

  return { oldQty, newQty };
};

export const handleCouponOrder = async (
  coupon: CouponType,
  newTotPrice: number,
  orderItemsFresh: OrderItem[]
) => {
  let resetCoupon = false;
  let expiredCoupon = false;
  let discount = 0;

  const isPriceCOndOk = newTotPrice >= coupon.minCartPrice;
  const isStillValid = new Date(coupon.expiryDate).getTime() > Date.now();

  if ((!isPriceCOndOk || !orderItemsFresh.length) && isStillValid) {
    resetCoupon = true;

    await Coupon.findByIdAndUpdate(coupon._id, {
      isActive: true,
    });
  } else if (!isStillValid) {
    expiredCoupon = true;

    await Coupon.findByIdAndUpdate(coupon._id, {
      isActive: false,
    });
  } else {
    discount = +((newTotPrice / 100) * coupon.discount).toFixed(2);
  }

  return {
    resetCoupon,
    expiredCoupon,
    discount,
  };
};

export const handleOutStock = async (
  res: Response,
  userId: string,
  order: OrderType,
  restaurant: RestaurantType
) => {
  const promises = order.items
    .map((el: OrderItem) =>
      (el.images as ImageType[]).map(
        async (el: ImageType) => await deleteCloud(el.public_id)
      )
    )
    .flat(Infinity);
  try {
    await Promise.all(promises);
  } catch {}

  await Order.findByIdAndDelete(order._id);
  await User.findByIdAndUpdate(userId, {
    $pull: { orders: order._id },
  });
  await Restaurant.findByIdAndUpdate(restaurant._id, {
    $pull: { orders: order._id },
  });

  let coupon: HydratedDocument<CouponType> | null = null;

  if (order.coupon)
    coupon = (await Coupon.findById(
      order.coupon
    )) as HydratedDocument<CouponType> | null;
  if (!coupon)
    return baseErrResponse(res, 404, "Some items are not available anymore");

  const isStillValid = new Date(coupon.expiryDate ?? 0).getTime() > Date.now();
  if (!isStillValid) {
    coupon.isActive = false;
    await coupon.save();
  }

  return res.status(422).json({
    msg: "Some items are not available anymore",
    success: false,
    resetCoupon: isStillValid,
  });
};
