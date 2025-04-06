import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Restaurant from "../../models/Restaurant.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import {
  badRequest,
  baseErrResponse,
  unauthorizedErr,
} from "../../utils/baseErrResponse.js";
import Order, { ordersStatusArr, OrderType } from "../../models/Order.js";
import { HydratedDocument } from "mongoose";

const updatableStatus = ordersStatusArr.slice(0, ordersStatusArr.length - 1);

export const updateOrderStatus = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.params;
  const { status } = req.body;

  const restaurants = await Restaurant.find({
    owner: makeMongoId(userId as string),
  });
  if (!restaurants.length)
    return unauthorizedErr(res, "No restaurants so no right update orders");
  const order = (await Order.findOne({
    _id: makeMongoId(orderId as string),
    restaurantId: { $in: restaurants.map((el) => el._id) },
  })) as HydratedDocument<OrderType> | null;
  if (!order) return baseErrResponse(res, 404, "Order not found");
  if (["pending", "cancelled", "delivered"].includes(order.status))
    return badRequest(res);
  if (status === "cancelled") return badRequest(res);

  const oldI = updatableStatus.findIndex((el) => el === order.status);
  const newI = updatableStatus.findIndex((el) => el === status);
  if (newI <= oldI)
    return baseErrResponse(res, 400, "Rollback status not allowed");

  order.status = status;
  await order.save();

  return res
    .status(200)
    .json({ message: "Order status updated", success: true });
};
