import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import {
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../../utils/baseErrResponse.js";
import { checkTokenSHA } from "../../utils/token.js";
import Restaurant from "../../models/Restaurant.js";
import { deleteCloud } from "../../utils/cloud.js";
import { ImageType } from "../../models/Image.js";
import { DishType } from "../../models/Dish.js";
import { HydratedDocument } from "mongoose";
import { clearData } from "../../utils/clearData.js";
import Order from "../../models/Order.js";

export const deleteAccount = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { manageAccountToken } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.tokens.manageAccount?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isExpired =
    new Date(user.tokens.manageAccount?.expiry ?? 0).getTime() < Date.now();
  const isMatch = checkTokenSHA(
    manageAccountToken,
    user.tokens.manageAccount?.hashed,
    "manageAccount"
  );

  if (isExpired || !isMatch) {
    user.tokens.manageAccount = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return unauthorizedErr(res, isExpired ? "Token expired" : "Invalid Token");
  }

  const restaurants = await Restaurant.find({
    owner: user._id,
  }).populate("dishes");

  const ordersAsOwner = await Order.find({
    restaurantId: { $in: restaurants.map((el) => el._id) },
    status: { $in: ["confirmed", "processing", "shipped"] },
  });
  if (ordersAsOwner?.length)
    return baseErrResponse(res, 403, "You have orders to process");
  const ordersAsUser = await Order.find({
    userId: user._id,
    status: { $in: ["confirmed", "processing", "shipped"] },
  });
  if (ordersAsUser?.length)
    return baseErrResponse(res, 403, "You have orders to receive");

  if (restaurants?.length) {
    const promises = restaurants.map(async (el) => await clearData(el));
    await Promise.all(promises);
  }

  await Order.updateMany({ userId: { $eq: userId } }, { userId: null });

  const result = await User.deleteOne({ _id: userId });

  if (result?.deletedCount !== 1) {
    return userNotFound(res);
  } else {
    res.cookie("refreshToken", "", { expires: new Date(0) });
    return res.status(200).json({ success: true, msg: "Account deleted" });
  }
};

/*
  if (restaurants?.length) {
    const promises = restaurants.map(async (el) => {
      if (el?.dishes?.length) {
        const promisesDishesImages = el.dishes
          .map(async (dish: HydratedDocument<DishType>) =>
            dish.images.map(async (img) => await deleteCloud(img.public_id))
          )
          .flat(Infinity);
        const promisesDishes = el.dishes.map(
          async (dish: HydratedDocument<DishType>) => await dish.deleteOne()
        );

        await Promise.all([...promisesDishesImages, promisesDishes]);
      }
      const promisesRestaurantImages = el.images.map(
        async (img: ImageType) => await deleteCloud(img.public_id)
      );
      await Promise.all(promisesRestaurantImages);

      await el.deleteOne();
    });

    await Promise.all(promises);
  }
    */
