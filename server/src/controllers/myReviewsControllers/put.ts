import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Review, { ReviewType } from "../../models/Review.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";

export const getReview = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { revId } = req.params;

  const review = await Review.findOne({
    user: makeMongoId(userId ?? ""),
    _id: makeMongoId(revId),
  }).populate({
    path: "restaurant",
    populate: {
      path: "reviews",
    },
  });
  if (!review) return baseErrResponse(res, 404, "Review not found");

  review.restaurant = {
    ...review.restaurant,
    avgRating: +(
      review.restaurant.reviews.reduce(
        (acc: number, curr: ReviewType) => acc + curr.rating,
        0
      ) / review.restaurant.reviews.length
    ).toFixed(2),
  };

  return res.status(200).json({ msg: "ok", success: true, review });
};
