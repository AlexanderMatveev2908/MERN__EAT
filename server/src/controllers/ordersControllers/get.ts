import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderType } from "../../models/Order.js";
import { makeQMyOrders } from "../../utils/makeQueries/myOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import {
  heapDiscountAsc,
  heapDiscountDesc,
  mergeSortPrice,
  quickSortDate,
} from "./funnyRecursive.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import { handleNoHits } from "../../utils/handleNoHits.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";

const getCreatedAt = (el: OrderType) => new Date(el.createdAt);
const getUpdatedAt = (el: OrderType) => new Date(el.updatedAt);

export const getOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const queryObj = makeQMyOrders(req);
  const sortObj = makeSorters(req, "");
  const { limit, skip } = calcPagination(req);

  const totDocuments = await Order.countDocuments();
  const nHits = await Order.countDocuments(queryObj);
  if (!totDocuments) return handleNoHits(res, totDocuments);

  let orders = (await Order.find(queryObj).skip(skip).limit(limit).lean()) as
    | OrderType[]
    | [];
  if (!orders.length) return handleNoHits(res, totDocuments);

  if (sortObj?.createdAt)
    orders = quickSortDate(orders, sortObj.createdAt, getCreatedAt);
  if (sortObj?.updatedAt)
    orders = quickSortDate(orders, sortObj.updatedAt, getUpdatedAt);
  if (sortObj?.price) orders = mergeSortPrice(orders, sortObj.price);

  if (sortObj?.discount)
    if (sortObj?.discount === 1) heapDiscountAsc(orders);
    else if (sortObj?.discount === -1) heapDiscountDesc(orders);

  let i = orders.length - 1;

  do {
    const curr = orders[i];
    curr.isAdmin = curr.userId + "" === userId;
    i--;
  } while (i >= 0);

  const totPages = Math.ceil(nHits / limit);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    totDocuments,
    totPages,
    nHits,
    orders,
  });
};
