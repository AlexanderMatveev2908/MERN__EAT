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
    owner: userId,
    images: arrImages,
  });

  if (!user.restaurants?.length) user.set({ restaurants: [newRestaurant._id] });
  else user.restaurants.push(newRestaurant._id);

  await user.save();

  return res.status(201).json({ success: true, restId: newRestaurant._id });
};

export const updateMyRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { user, restaurant } = await checkUserProperty(req, res);
  if ([user, restaurant].some((el) => !el)) return;

  if (!req.body?.phone && !user.address?.phone)
    return baseErrResponse(
      res,
      400,
      "Phone number is required if not specified in profile details"
    );

  let updatedImages;

  if (!JSON.parse(req.body?.restaurantImages ?? "[]")?.length) {
    const promises = restaurant.images.map(
      async (img: ImageType) => await deleteCloud(img.public_id)
    );

    await Promise.all(promises);

    updatedImages = await uploadCloud(req.files as Express.Multer.File[]);
  } else {
    const parsedImgs = JSON.parse(req.body.restaurantImages ?? "[]");

    const reqIds = new Set(parsedImgs.map((el: ImageType) => el.public_id));

    const deletedImages = restaurant.images.filter(
      (img: ImageType) => !reqIds.has(img.public_id)
    );

    const promises = deletedImages.map(
      async (img: ImageType) => await deleteCloud(img.public_id)
    );

    await Promise.all(promises);

    updatedImages = parsedImgs;
  }

  restaurant.set({
    ...formatMyRestaurantsBody(req, user.email, user.address?.phone),
    images: updatedImages,
  });

  await restaurant.save();

  return res
    .status(200)
    .json({ msg: "Restaurant updated", success: true, restId: restaurant._id });
};

export const deleteRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { user, restaurant } = await checkUserProperty(req, res);
  if ([user, restaurant].some((el) => !el)) return;

  const promises = restaurant.images.map(
    async (img: ImageType) => await deleteCloud(img.public_id)
  );

  await Promise.all(promises);

  await restaurant.deleteOne();

  return res.status(200).json({ msg: "Restaurant deleted", success: true });
};
