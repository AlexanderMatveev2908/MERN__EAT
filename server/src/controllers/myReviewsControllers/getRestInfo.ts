import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import { ReviewType } from "../../models/Review.js";

export const getInfoRest = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { restId } = req.params;

  const orders = await Order.find({
    userId: makeMongoId(userId ?? ""),
    restaurantId: makeMongoId(restId),
    status: "delivered",
  }).lean();
  if (!orders.length)
    return baseErrResponse(
      res,
      400,
      "User does not have eat at the restaurant"
    );

  const restaurant = (await Restaurant.findById(restId)
    .populate("reviews")
    .lean()) as RestaurantType | null;
  if (!restaurant)
    return baseErrResponse(res, 404, "Restaurant not found or activity closed");

  const avgRating = +(restaurant.reviews as ReviewType[])
    .reduce((acc: number, curr: ReviewType) => acc + curr.rating, 0)
    .toFixed(2);
  restaurant.avgRating = avgRating;

  return res.status(200).json({
    success: true,
    msg: "ok",
    restaurant,
  });
};
