import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import Order, { OrderType } from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import Restaurant from "../../models/Restaurant.js";
import { handleNoHits } from "../../utils/handleNoHits.js";
import { filterManageOrders } from "../../utils/makeQueries/manageOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import { sortOrders } from "./funnyRecursive.js";

export const getManageOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const restaurants = await Restaurant.find({
    owner: makeMongoId(userId ?? ""),
  });
  if (!restaurants.length) return handleNoHits(res, 0);
  const ids = restaurants.map((el) => el._id);

  const { limit, skip } = calcPagination(req);
  const sortObj = makeSorters(req, "");
  const totDocuments = await Order.countDocuments({
    restaurantId: { $in: ids },
  });

  const orders = await Order.find({
    restaurantId: { $in: ids },
  })
    .populate("restaurantId")
    .lean();

  const { filtered } = filterManageOrders(
    req,
    orders.map((el) => ({
      ...el,
      restaurantId: {
        _id: el.restaurantId?._id,
        categories: el?.restaurantId.categories,
        delivery: el?.restaurantId.delivery,
      },
    })) as any
  );
  const nHits = filtered.length;
  const totPages = Math.ceil(nHits / limit);

  let sorted: OrderType[] = filtered;
  if (sortObj) sorted = sortOrders(filtered, sortObj);

  const cutted = sorted.slice(skip, skip + limit);

  return res.status(200).json({
    message: "ok",
    success: true,
    orders: cutted,
    totPages,
    totDocuments,
    nHits,
  });
};
