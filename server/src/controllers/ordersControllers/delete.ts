import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderItem } from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import User from "../../models/User.js";
import Restaurant from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { ImageType } from "../../models/Image.js";
import { deleteCloud } from "../../utils/cloud.js";

export const deletePendingOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { orderId } = req.params;

  const order = await Order.findOne({
    userId: makeMongoId(userId as string),
    _id: makeMongoId(orderId as string),
  });
  if (!order) return baseErrResponse(res, 404, "Order not found");

  if (order.status !== "pending")
    return baseErrResponse(res, 400, "Order is not pending");

  try {
    await Promise.all(
      order.items
        .map((el: OrderItem) =>
          (el.images as ImageType[]).map(
            async (el: ImageType) => await deleteCloud(el.public_id)
          )
        )
        .flat(Infinity)
    );
  } catch {}

  await User.findByIdAndUpdate(userId, {
    $pull: { orders: makeMongoId(orderId as string) },
  });
  await Restaurant.findOneAndUpdate(
    { orders: makeMongoId(orderId as string) },
    { $pull: { orders: makeMongoId(orderId as string) } }
  );
  await Order.findByIdAndDelete(orderId);

  return res.status(204).end();
};
