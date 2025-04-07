import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Order from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import Review, { ReviewType } from "../../models/Review.js";
import { Multer } from "multer";
import { ImageType } from "../../models/Image.js";
import { uploadCloudMyReviews } from "../../utils/cloud.js";
import User, { UserType } from "../../models/User.js";
import { HydratedDocument } from "mongoose";

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

  if (restaurant.reviews.some((el: any) => el.user + "" === userId))
    return baseErrResponse(res, 400, "User already reviewed this restaurant");

  const avgRating = +(
    (restaurant.reviews as ReviewType[]).reduce(
      (acc: number, curr: ReviewType) => acc + curr.rating,
      0
    ) / restaurant.reviews.length
  ).toFixed(2);
  restaurant.avgRating = avgRating;

  return res.status(200).json({
    success: true,
    msg: "ok",
    restaurant,
  });
};

export const createReview = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { restId } = req.params;

  const user = (await User.findById(
    userId
  )) as HydratedDocument<UserType> | null;
  const restaurant = (await Restaurant.findById(restId)).populate(
    "reviews"
  ) as RestaurantType | null;
  if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");
  if (restaurant.reviews?.some((el: any) => el.user + "" === userId))
    return baseErrResponse(res, 400, "User already reviewed this restaurant");

  let images: ImageType[] = [];
  if (req.files?.length as any) images = await uploadCloudMyReviews(req.files);

  const newReview = await Review.create({
    user: userId,
    restaurant: restId,
    ...req.body,
    images,
  });

  user!.reviews.push(newReview._id);
  await user!.save();
  // after populate document become js obj
  await Restaurant.findByIdAndUpdate(restId, {
    $push: { reviews: newReview._id },
  });

  return res
    .status(201)
    .json({ msg: "Review created", success: true, revId: newReview._id });
};
