import { OrderItem, OrderType } from "../../models/Order.js";
import { RestaurantType } from "../../models/Restaurant.js";

import Dish, { DishType } from "../../models/Dish.js";
import Coupon, { CouponType } from "../../models/Coupon.js";

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
