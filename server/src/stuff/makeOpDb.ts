import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import Review from "../models/Review.js";
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
      const promises = el.items
        .map((el: any) =>
          el.images.map(async (el: any) => await deleteCloud(el.public_id))
        )
        .flat(Infinity);
      try {
        await Promise.all(promises);
      } catch {}

      await el.deleteOne();
    });

    await Promise.all(promises);

    await User.updateMany({}, { orders: [] });
    await Coupon.deleteMany({});
  }

  await Coupon.deleteMany({});
  await User.updateMany({}, { orders: [], cart: null });
  await Restaurant.updateMany({}, { orders: [] });
};

export const delRev = async () => {
  const revs = await Review.find({});

  if (!revs.length) return;

  const promises: Promise<any>[] = [];

  let i = revs.length - 1;

  do {
    const curr = revs[i];

    promises.push(
      Restaurant.updateMany(
        {
          _id: { $in: revs.map((el) => el.restaurant) },
        },
        { reviews: [] }
      )
    );
    promises.push(
      User.updateMany(
        { _id: { $in: revs.map((el) => el.user) } },
        { reviews: [] }
      )
    );

    const imgPromises = curr.images.map(
      async (el: any) => await deleteCloud(el.public_url)
    );
    await Promise.all(imgPromises);

    promises.push(curr.deleteOne());

    i--;
  } while (i >= 0);

  try {
    await Promise.all(promises);
  } catch {}
};
