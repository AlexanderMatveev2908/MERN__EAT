import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import { deleteCloud } from "../utils/cloud.js";

export const updateRest = async () => {
  const rest = await Restaurant.findById("67dd5666537f1a7c2103ee43");

  const randomRest = await Restaurant.findById("67dec23c33223dc5e44d3799");

  rest.images = [
    ...randomRest.images.map((el: any) => ({ ...el, _id: rest._id })),
  ];

  await rest.save();
};

export const makeCart = async () => {
  await User.updateMany({}, { $set: { cart: null } });

  const carts = await Cart.find({});

  if (!carts?.length) return;

  let i = 0;
  do {
    await Cart.findByIdAndDelete(carts[i]._id);
    i++;
  } while (i < carts.length);
};

export const clearDishes = async () => {
  await Restaurant.updateMany({}, { $set: { dishes: [] } });
};

export const clearCoupons = async () => await Coupon.deleteMany({});

export const updateCO = async () => {
  const orders = await Order.find({});
  if (orders.length) {
    const promises = orders.map(async (el: any) => {
      const promises = el.images.map(
        async (el: any) => await deleteCloud(el.public_id)
      );

      await Promise.all(promises);

      await el.deleteOne();
    });

    await Promise.all(promises);

    await User.updateMany({}, { orders: [] });
    await Coupon.deleteMany({});
  }

  await Coupon.deleteMany({});
  await User.updateMany({}, { orders: [] });
};
