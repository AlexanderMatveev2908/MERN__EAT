import { HydratedDocument } from "mongoose";
import Coupon, { CouponType } from "../../../models/Coupon.js";
import Order, { OrderItem, OrderType } from "../../../models/Order.js";
import Restaurant, { RestaurantType } from "../../../models/Restaurant.js";
import User from "../../../models/User.js";
import { baseErrResponse } from "../../../utils/baseErrResponse.js";
import {
  checkDataExistOrder,
  checkIsOpen,
  getFreshItemsStock,
} from "../../../utils/orders/refreshOrder.js";
import { RequestWithUserId } from ".././../../middleware/general/verifyAccessToken.js";
import { Response } from "express";
import Dish, { DishType } from "../../../models/Dish.js";

export const lastCheckOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { email, firstName, lastName, ...address } = req.body;

  const result = await checkDataExistOrder(req, res);
  if (!result) return;
  const { restaurant, order } = result as {
    order: OrderType;
    restaurant: RestaurantType;
  };

  if (order?.status !== "pending")
    return baseErrResponse(res, 400, "Order is not pending");

  if (!checkIsOpen(restaurant))
    return baseErrResponse(
      res,
      400,
      "Restaurant closed or would not make in time order"
    );

  const { oldQty, newQty } = await getFreshItemsStock(order);

  if (oldQty !== newQty) {
    await User.findByIdAndUpdate(userId, {
      $pull: { orders: order._id },
    });
    await Order.findByIdAndDelete(order._id);
    await Restaurant.findByIdAndUpdate(restaurant._id, {
      $pull: { orders: order._id },
    });

    if (order.coupon) {
      const coupon = (await Coupon.findById(
        order.coupon
      )) as HydratedDocument<CouponType> | null;

      if (coupon) {
        const isStillValid =
          new Date(coupon.expiryDate ?? 0).getTime() > Date.now();

        if (!isStillValid) {
          coupon.isActive = false;
          await coupon.save();
        }
      }
    }

    return baseErrResponse(res, 400, "Some items are not available anymore");
  }

  await Order.findByIdAndUpdate(order._id, {
    $set: {
      addressUser: address,
      "infoUser.email": email,
      "infoUser.firstName": firstName,
      "infoUser.lastName": lastName,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
};
