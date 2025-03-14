import { Response } from "express";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { baseErrResponse, userNotFound } from "../../utils/baseErrResponse.js";
import { deleteCloud, uploadCloud } from "../../utils/cloud.js";
import { formatMyRestaurantsBody } from "../../utils/getValsMyRestaurantFromBody.js";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { checkUserProperty } from "../../utils/checkers/myRestaurants.js";
import { ImageType } from "../../models/Image.js";

export const createRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.isVerified) return baseErrResponse(res, 403, "User not verified");
  if (!req.body?.phone && !user.address?.phone)
    return baseErrResponse(
      res,
      400,
      "Phone number is required if not specified in profile details"
    );

  const arrImages = await uploadCloud(req.files as Express.Multer.File[]);

  const newRestaurant = await Restaurant.create({
    ...formatMyRestaurantsBody(req, user.email, user.address?.phone),
    images: arrImages,
  });

  return res.status(201).json({ success: true, restId: newRestaurant._id });
};

export const updateMyRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const result = await checkUserProperty(req, res);
  if (!result) return;

  const { user, restaurant } = result;

  if (!req.body?.phone && !user.address?.phone)
    return baseErrResponse(
      res,
      400,
      "Phone number is required if not specified in profile details"
    );

  let updatedImages;

  if (!req.body?.images?.length) {
    const promises = restaurant.images.map(
      async (img: ImageType) => await deleteCloud(img.public_id)
    );

    await Promise.all(promises);

    updatedImages = await uploadCloud(req.files as Express.Multer.File[]);
  } else {
    const reqIds = new Set(
      req.body.images.map((el: ImageType) => el.public_id)
    );

    const deletedImages = restaurant.images.filter(
      (img: ImageType) => !reqIds.has(img.public_id)
    );

    const promises = deletedImages.map(
      async (img: ImageType) => await deleteCloud(img.public_id)
    );

    const result = await Promise.all(promises);

    updatedImages = req.body.images;
  }

  return res.status(200).json({ msg: "Restaurant updated", success: true });
};
