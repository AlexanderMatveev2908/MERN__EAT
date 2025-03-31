import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Cart, { CartItem, CartType } from "../../models/Cart.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { createCouponHashed } from "../../utils/coupon/generateCoupons.js";
import Coupon, { CouponType } from "../../models/Coupon.js";
import { HydratedDocument } from "mongoose";
import Dish, { DishType } from "../../models/Dish.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import User, { UserType } from "../../models/User.js";
import Order, { OrderItem, OrderType } from "../../models/Order.js";
import { ImageType } from "../../models/Image.js";
import { uploadCloudURL } from "../../utils/cloud.js";

// WHEN OPEN
// if (open <= currTime && close > currTime) console.log(true);
// else console.log(false);
// if (open === close) console.log(true);
// if (open <= currTime && close < open) console.log(true);
// if (close < open && close > currTime) console.log(true);

export const createOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { coupon } = req.body;

  const cart = (await Cart.findOne({
    user: makeMongoId(userId ?? ""),
  }).lean()) as CartType;
  if (!cart) {
    await User.findByIdAndUpdate(userId, { $set: { cart: null } });

    return baseErrResponse(res, 404, "Cart not found");
  }

  const existingRestaurant = (await Restaurant.findById(
    cart.restaurant
  ).lean()) as unknown as RestaurantType;
  if (!existingRestaurant) {
    await User.findByIdAndUpdate(userId, { $set: { cart: null } });
    await Cart.findByIdAndDelete(cart._id);

    return baseErrResponse(res, 404, "Restaurant not found or activity closed");
  }

  const open = existingRestaurant.openHours.openTime;
  const close = existingRestaurant.openHours.closeTime;

  // IMPORTANT => ALL COULD BE SKIP WITH DATE GET HOURS AND DATE GET MINUTES BUT I WANTED EXERCISE WORKING WITH DATES
  // ms from 1 jan 1970
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
  let isClosed = false;

  if (close !== open) {
    if (open > currTime && close > currTime && close > open) isClosed = true;
    if (open < currTime && close <= currTime) isClosed = true;
    if (close <= currTime && close < open && open > currTime) isClosed = true;
  }

  if (isClosed) return baseErrResponse(res, 400, "Restaurant closed right now");

  let couponSaved: HydratedDocument<CouponType> | null = null;

  if (coupon) {
    // IMPORTANT => I CAN DO THIS JUST CAUSE SHA256 AND HMAC ARE DETERMINISTIC SO SAME INPUT SAME RES, I COULD NOT DO IT WITH BCRYPT ARGON OR AN AES(ADVANCED ENCRYPTION STANDARD) THAT USUALLY USE AN ALGORITHM THAT INCLUDE THE RESPECT OF AVALANCHE PRINCIPLE TO NOT HAVE SAME RESULT FOR SAME PRINCIPLE
    const couponHashed = createCouponHashed(coupon);
    couponSaved = (await Coupon.findOne({
      hashedCode: couponHashed,
    })) as HydratedDocument<CouponType> | null;

    if (!couponSaved) return baseErrResponse(res, 404, "Coupon not found");
    //  i am trying to understand better status code and 422 of logical issues seems ok here
    if (!couponSaved.isActive)
      return baseErrResponse(res, 422, "Coupon already used or expired");
    if (new Date(couponSaved.expiryDate).getTime() < Date.now()) {
      couponSaved.isActive = false;
      await couponSaved.save();

      return baseErrResponse(res, 422, "Coupon expired");
    }
  }
  const orderItems: OrderItem[] = [];

  const promises = cart.items.map(async (el: CartItem) => {
    const dish = (await Dish.findById(el.dishId)) as DishType;
    if (!dish || !dish?.quantity) return;

    const promisesImages = dish.images.map(
      async (el: ImageType) => await uploadCloudURL(el.url)
    );
    const images: Omit<ImageType, "_id">[] = await Promise.all(promisesImages);

    orderItems.push({
      name: dish.name,
      price: dish.price,
      dishId: dish._id,
      images,
      //  could be used also Math.max if preferred
      quantity: el.quantity > dish.quantity ? dish.quantity : el.quantity,
    });
  });

  await Promise.all(promises);

  if (!orderItems.length) {
    await User.findByIdAndUpdate(userId, { $set: { cart: null } });
    await Cart.findByIdAndDelete(cart._id);

    return baseErrResponse(
      res,
      422,
      "Items not available or removed from menu"
    );
  }

  const user: UserType = (await User.findById(
    userId
  ).lean()) as unknown as UserType;

  let totQty = 0,
    totPrice = 0;

  let i = 0;
  do {
    const curr = orderItems[i];
    totQty += curr.quantity;
    totPrice += curr.price * curr.quantity;

    i++;
  } while (i < orderItems.length);

  if (couponSaved && totPrice < couponSaved.minCartPrice)
    return baseErrResponse(res, 400, "Amount to use coupon not reached");

  const priceWithDiscount = couponSaved
    ? +(totPrice - (totPrice / 100) * couponSaved.discount)
    : null;

  const freeMeal = existingRestaurant.delivery.freeDeliveryPrice;
  const delPrice = existingRestaurant.delivery.price;

  const newOrder: OrderType = {
    userId: userId as string,
    userEmail: user.email,

    restaurantId: existingRestaurant._id,
    restaurantName: existingRestaurant.name,

    items: orderItems,
    priceNoDiscount: +totPrice.toFixed(2),
    priceWithDiscount: priceWithDiscount ? +priceWithDiscount.toFixed(2) : null,
    delivery: freeMeal > totPrice ? delPrice : null,
    coupon: couponSaved ? (couponSaved._id as any) : null,
    status: "created",
  };

  const newMongoOrder = (await Order.create(newOrder)) as OrderType;
  if (!newMongoOrder) return baseErrResponse(res, 500, "Error creating order");

  if (couponSaved) {
    couponSaved.usedBy = user._id;
    couponSaved.usedFor = newMongoOrder._id as string;
    couponSaved.isActive = false;

    await couponSaved.save();
  }

  await Cart.findByIdAndDelete(cart._id);
  await User.findByIdAndUpdate(userId, {
    $set: {
      cart: null,
      orders: user.orders?.length
        ? [...user.orders, newMongoOrder._id]
        : [newMongoOrder._id],
    },
  });

  return res.status(201).json({ msg: "Order created", success: true });
};
