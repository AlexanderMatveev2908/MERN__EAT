import Order, { OrderItem, OrderType } from "../../models/Order.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";

import Dish, { DishType } from "../../models/Dish.js";
import Coupon from "../../models/Coupon.js";
import { ImageType } from "../../models/Image.js";
import { deleteCloud } from "../cloud.js";
import User from "../../models/User.js";
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

export const clearOrder = async (
  res: Response,
  order: OrderType,
  restaurant?: RestaurantType
) => {
  if (restaurant)
    await Restaurant.findByIdAndUpdate(restaurant._id, {
      $pull: { orders: order._id },
    });

  await Order.findByIdAndDelete(order._id);
  await User.findByIdAndUpdate(order.userId, {
    $pull: { orders: order._id },
  });
  if (!order.coupon) return baseErrResponse(res, 404, "Restaurant not found");

  try {
    await Promise.all(
      order.items
        .map((el) =>
          (el.images as ImageType[]).map(
            async (el: ImageType) => await deleteCloud(el.public_id as string)
          )
        )
        .flat(Infinity)
    );
  } catch {}

  const coupon = await Coupon.findById(order.coupon);
  const isStillValid = new Date(coupon?.expiryDate ?? 0).getTime() > Date.now();
  if (coupon) {
    coupon.usedBy = null;
    coupon.usedFor = null;

    if (!isStillValid) coupon.isActive = false;
    else coupon.isActive = false;

    await coupon.save();
  }

  return res.status(404).json({
    msg: "Restaurant not found",
    success: false,
    resetCoupon: isStillValid,
  });
};
