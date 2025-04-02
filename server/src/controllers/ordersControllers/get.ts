import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order, { OrderType } from "../../models/Order.js";
import { makeQMyOrders } from "../../utils/makeQueries/myOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";

const getCreatedAt = (el: OrderType) => new Date(el.createdAt);
const getUpdatedAt = (el: OrderType) => new Date(el.updatedAt);

const quickSortDate = (
  arr: OrderType[],
  val: number,
  cbProcessOrder: (el: OrderType) => Date
): OrderType[] => {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  let left = [],
    right = [],
    equal = [];

  for (const order of arr) {
    const dateOrderToSort = cbProcessOrder(order);
    const datePivotToSort = cbProcessOrder(pivot);

    // 1 => from smaller to bigger
    if (val === 1) {
      if (dateOrderToSort < datePivotToSort) left.push(order);
      else if (dateOrderToSort > datePivotToSort) right.push(order);
      else equal.push(order);
    } else if (val === -1) {
      if (dateOrderToSort > datePivotToSort) left.push(order);
      else if (dateOrderToSort < datePivotToSort) right.push(order);
      else equal.push(order);
    } else {
      throw new Error("Invalid param");
    }
  }

  return [
    ...quickSortDate(left, val, cbProcessOrder),
    ...equal,
    ...quickSortDate(right, val, cbProcessOrder),
  ];
};

export const getOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const queryObj = makeQMyOrders(req);
  const sortObj = makeSorters(req, "");

  let orders = await Order.find(queryObj);

  console.log(orders);
  console.log("--------------");
  if (sortObj.createdAt)
    orders = quickSortDate(orders, sortObj.createdAt, getCreatedAt);
  if (sortObj.updatedAt)
    orders = quickSortDate(orders, sortObj.updatedAt, getUpdatedAt);

  console.log(orders);
  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
  });
};
