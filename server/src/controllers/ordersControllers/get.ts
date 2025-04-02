import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderType } from "../../models/Order.js";
import { makeQMyOrders } from "../../utils/makeQueries/myOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import { mergeSortPrice, quickSortDate } from "./funnyRecursive.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import { handleNoHits } from "../../utils/handleNoHits.js";

const getCreatedAt = (el: OrderType) => new Date(el.createdAt);
const getUpdatedAt = (el: OrderType) => new Date(el.updatedAt);

export const getOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const queryObj = makeQMyOrders(req);
  const sortObj = makeSorters(req, "");
  const { limit, skip } = calcPagination(req);

  const totDocuments = await Order.countDocuments();
  const nHits = await Order.countDocuments(queryObj);
  if (!totDocuments) return handleNoHits(res, totDocuments);

  let orders = await Order.find(queryObj).skip(skip).limit(limit);
  if (!orders.length) return handleNoHits(res, totDocuments);

  console.log(orders);
  console.log("--------------");
  if (sortObj?.createdAt)
    orders = quickSortDate(orders, sortObj.createdAt, getCreatedAt);
  if (sortObj?.updatedAt)
    orders = quickSortDate(orders, sortObj.updatedAt, getUpdatedAt);
  if (sortObj?.price) orders = mergeSortPrice(orders, sortObj.price);

  console.log(orders);

  const totPages = Math.ceil(nHits / limit);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
  });
};
