import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import Review, { ReviewType } from "../../models/Review.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { HydratedDocument } from "mongoose";
import { ImageType } from "../../models/Image.js";
import { deleteCloud, uploadCloudMyReviews } from "../../utils/cloud.js";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";

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

export const updateReview = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { revId } = req.params;

  let updatedImages: any[] = [];

  const review = (await Review.findById(
    revId
  )) as HydratedDocument<ReviewType> | null;
  if (!review) return baseErrResponse(res, 404, "Review not found");

  const existingImages = JSON.parse(req.body.images ?? "[]");
  const newFiles = req.files as Express.Multer.File[];
  if (existingImages.length) {
    const idsDelete = review.images
      .filter(
        (img: ImageType) =>
          !new Set(existingImages.map((el: ImageType) => el.public_id)).has(
            img.public_id
          )
      )
      .map((img: ImageType) => img.public_id);

    if (idsDelete.length) {
      try {
        await Promise.all(idsDelete.map(async (id) => await deleteCloud(id)));
      } catch {}
    }

    updatedImages = existingImages;
  } else if (newFiles.length) {
    if (review.images.length) {
      try {
        await Promise.all(
          review.images.map(
            async (img: ImageType) => await deleteCloud(img.public_id)
          )
        );
      } catch {}
    }

    updatedImages = await uploadCloudMyReviews(req.files);
  }

  review.title = req.body.title;
  review.rating = +req.body.rating;
  review.comment = req.body.comment || null;
  review.images = updatedImages;
  await review.save();

  return res.status(200).json({ msg: "ok", success: true });
};

export const deleteReview = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { revId } = req.params;

  const review = (await Review.findOne({
    user: makeMongoId(userId ?? ""),
    _id: makeMongoId(revId),
  })) as HydratedDocument<ReviewType> | null;
  if (!review) return baseErrResponse(res, 404, "Review not found");

  if (review.images.length) {
    try {
      await Promise.all(
        review.images.map(
          async (img: ImageType) => await deleteCloud(img.public_id)
        )
      );
    } catch {}
  }

  await Restaurant.findByIdAndUpdate(
    {
      _id: review.restaurant,
    },
    {
      $pull: {
        reviews: review._id,
      },
    }
  );
  await User.findByIdAndUpdate(
    {
      _id: review.user,
    },
    {
      $pull: {
        reviews: review._id,
      },
    }
  );
  await review.deleteOne();

  return res.status(204).end();
};
