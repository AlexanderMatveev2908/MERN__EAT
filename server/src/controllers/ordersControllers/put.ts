import Order, { OrderType } from "../../models/Order.js";
import { RestaurantType } from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import {
  checkDataExistOrder,
  checkIsOpen,
  getFreshItemsStock,
} from "../../utils/orders/refreshOrder.js";
import { RequestWithUserId } from "./../../middleware/general/verifyAccessToken.js";
import { Response } from "express";

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

  if (!checkIsOpen(restaurant))
    return baseErrResponse(
      res,
      400,
      "Restaurant closed or would not make in time order"
    );

  const { orderItemsFresh, oldQty, newQty } = await getFreshItemsStock(order);
};
