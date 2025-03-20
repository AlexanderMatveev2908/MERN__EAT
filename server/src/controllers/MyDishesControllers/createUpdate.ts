import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import fs from "fs";
import { uploadCloudStorage } from "../../utils/cloud.js";
import Restaurant from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import mongoose from "mongoose";
import Dish from "../../models/Dish.js";

const makeMongoId = (id: string) => new mongoose.Types.ObjectId(id);

export const createDishes = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { restId } = req.query;
  const form = req.body;
  const files = req.files as Express.Multer.File[];

  const existingRestaurant = await Restaurant.findOne({
    _id: makeMongoId(restId),
    owner: makeMongoId(userId),
  });
  if (!existingRestaurant) {
    for (const file of files) {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    }
    return baseErrResponse(res, 404, "Restaurant not found");
  }

  const arrFiles = Object.entries(files).map(([key, val]) => ({
    [key]: val,
  }));
  const arrReturnedPromises = arrFiles.map(async (dishFiles, i) => {
    const images = await uploadCloudStorage(dishFiles[`images_${i}` as any]);
    return images;
  });
  const dataImages = await Promise.all(arrReturnedPromises);

  const promisesDishes = form.dishes.map(async (el: any, i: number) => {
    const newDish = await Dish.create({
      ...el,
      restaurant: existingRestaurant._id,
      images: dataImages[i],
    });

    return newDish._id;
  });

  const arrIdsDishes = await Promise.all(promisesDishes);
  if (!existingRestaurant.dishes?.length)
    existingRestaurant.dishes = arrIdsDishes;
  else
    existingRestaurant.dishes = [
      ...existingRestaurant.myDishesFieldsSearch,
      ...arrIdsDishes,
    ];
  await existingRestaurant.save();

  return res.status(200).json({
    message: "Dish created successfully",
    success: true,
    restId: existingRestaurant._id,
  });
};
