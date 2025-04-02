import { Request, Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";

export const getOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { ordersStatus, search, searchVals } = req.query;

  const queryObj: any = {};
  queryObj.userId = makeMongoId(userId ?? "");
  if (ordersStatus)
    queryObj.status = { $in: (ordersStatus as string).split(",") };

  const orders = await Order.find({});

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
  });
};
