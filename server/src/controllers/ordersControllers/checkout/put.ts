import Order, { OrderItem, OrderType } from "../../../models/Order.js";
import Restaurant, { RestaurantType } from "../../../models/Restaurant.js";
import User from "../../../models/User.js";
import { baseErrResponse } from "../../../utils/baseErrResponse.js";
import {
  checkIsOpen,
  clearOrder,
  getFreshItemsStock,
} from "../../../utils/orders/refreshOrder.js";
import { RequestWithUserId } from ".././../../middleware/general/verifyAccessToken.js";
import { Response } from "express";
import { makeMongoId } from "../../../utils/dbPipeline/general.js";

export const lastCheckOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.query;
  const { email, firstName, lastName, ...address } = req.body;

  const order = (await Order.findOne({
    _id: makeMongoId(orderId as string),
    userId: makeMongoId(userId as string),
  }).lean()) as OrderType | null;
  if (!order) {
    await User.findByIdAndUpdate(userId, {
      $pull: { orders: makeMongoId(orderId as string) },
    });
    await Restaurant.findOneAndUpdate(
      { orders: makeMongoId(orderId as string) },
      { $pull: { orders: makeMongoId(orderId as string) } }
    );
    return baseErrResponse(res, 404, "Order not found");
  }

  const restaurant = (await Restaurant.findById(
    order.restaurantId
  ).lean()) as RestaurantType | null;
  if (!restaurant) return clearOrder(res, order);

  if (order?.status !== "pending")
    return baseErrResponse(res, 400, "Order is not pending");

  if (!checkIsOpen(restaurant))
    return baseErrResponse(
      res,
      400,
      "Restaurant closed or would not make in time order"
    );

  const { orderItemsFresh, oldQty, newQty } = await getFreshItemsStock(order);
  if (oldQty !== newQty)
    return clearOrder(res, order, restaurant, orderItemsFresh);

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
