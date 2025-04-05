import Order, { OrderItem, OrderType } from "../../models/Order.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";

import Dish, { DishType } from "../../models/Dish.js";
import Coupon from "../../models/Coupon.js";
import { ImageType } from "../../models/Image.js";
import { deleteCloud } from "../cloud.js";
import User, { UserType } from "../../models/User.js";
import { baseErrResponse } from "../baseErrResponse.js";
import { Response } from "express";
import Cart, { CartItem, CartType } from "../../models/Cart.js";
import mongoose, { HydratedDocument } from "mongoose";

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

  return { orderItemsFresh, oldQty, newQty };
};

export const clearOrder = async (
  res: Response,
  order: OrderType,
  restaurant?: RestaurantType,
  orderItemsFresh?: OrderItem[]
) => {
  const user = (await User.findById(
    order.userId
  )) as HydratedDocument<UserType>;
  let remakeCart: boolean = false;

  if (restaurant) {
    await Restaurant.findByIdAndUpdate(restaurant._id, {
      $pull: { orders: order._id },
    });

    if (!user?.cart && orderItemsFresh?.length) {
      let totQty: number = 0;
      let totPrice: number = 0;
      const cartItems: CartItem[] = [];

      let i = 0;
      do {
        const curr = orderItemsFresh[i];

        totQty += curr.quantity;
        totPrice += curr.quantity * curr.price;

        const { images, ...rest } = curr;
        cartItems.push(rest as CartItem);

        i++;
      } while (i < orderItemsFresh.length);

      const newMongoCart = (await Cart.create({
        restaurant: restaurant._id,
        user: order.userId,
        items: cartItems,
        totQty,
        totPrice: +totPrice.toFixed(2),
      })) as CartType;

      if (newMongoCart) {
        remakeCart = true;
        user.cart = newMongoCart._id as mongoose.Types.ObjectId;
        await user.save();
      }
    }
  }

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

  await Order.findByIdAndDelete(order._id);
  user.orders = user.orders.filter((el) => el + "" !== order._id + "");
  await user.save();
  if (!order.coupon) return baseErrResponse(res, 404, "Restaurant not found");

  const coupon = await Coupon.findById(order.coupon);
  const isStillValid = new Date(coupon?.expiryDate ?? 0).getTime() > Date.now();
  if (coupon) {
    coupon.usedBy = null;
    coupon.usedFor = null;

    if (isStillValid) coupon.isActive = true;

    await coupon.save();
  }

  return res.status(404).json({
    msg: "Restaurant not found",
    success: false,
    resetCoupon: isStillValid,
    remakeCart,
  });
};
