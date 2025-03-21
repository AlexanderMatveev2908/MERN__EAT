import { Response } from "express";
import fs from "fs";
import {
  deleteCloud,
  uploadCloudStorage,
  uploadUpdateDish,
} from "../../utils/cloud.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import Dish, { DishType } from "../../models/Dish.js";
import { ImageType } from "../../models/Image.js";

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
  // form an obj of files provided by multer i create an array for each dish that keeps an array of files relative to dish
  const arrReturnedPromises = arrFiles.map(async (dishFiles, i) => {
    // each array will be uploaded by block, upload cloud storage map all files tye same way and return Promise.all
    const images = await uploadCloudStorage(dishFiles[`images_${i}` as any]);
    return images;
  });
  const dataImages = await Promise.all(arrReturnedPromises);
  // now i have array or array of results from cloudinary

  const promisesDishes = form.dishes.map(async (el: any, i: number) => {
    // i tried to organize all as better as i could to ge easier for both frontend and backend work with data, dishes are send as obj that keeps array of subForms of main form
    const newDish = await Dish.create({
      ...el,
      restaurant: existingRestaurant._id,
      images: dataImages[i],
    });

    return newDish._id;
  });

  const arrIdsDishes = await Promise.all(promisesDishes);
  // now need to update restaurant to be up to date with fresh dishes

  if (!existingRestaurant.dishes?.length)
    existingRestaurant.dishes = arrIdsDishes;
  else
    existingRestaurant.dishes = [...existingRestaurant.dishes, ...arrIdsDishes];
  await existingRestaurant.save();

  return res.status(200).json({
    message: "Dishes created successfully",
    success: true,
    restId: existingRestaurant._id,
  });
};

export const deleteDish = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { dishId } = req.params;

  const restaurant = await Restaurant.findOne({
    owner: makeMongoId(userId),
  });
  if (!restaurant) return baseErrResponse(res, 404, "Restaurant not found");

  const dish = await Dish.findOne({
    _id: makeMongoId(dishId),
    restaurant: restaurant._id,
  });
  if (!dish) return baseErrResponse(res, 404, "Dish not found");

  let i = 0;
  do {
    await deleteCloud(dish.images[i].public_id);
    i++;
  } while (i < dish.images.length);

  const result = await Dish.findOneAndDelete({
    _id: makeMongoId(dishId),
    restaurant: restaurant._id,
  });
  if (!result) return baseErrResponse(res, 404, "Dish not found");

  restaurant.dishes =
    restaurant.dishes?.length > 1
      ? restaurant.dishes.filter((id: any) => !id.equals(dish._id))
      : [];

  await restaurant.save();

  return res.status(204).end();
};

export const updateDish = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { dishId } = req.params;

  const restaurants = await Restaurant.find({ owner: makeMongoId(userId) });
  if (!restaurants.length)
    return baseErrResponse(res, 404, "Restaurant not found");

  const dish = await Dish.findOne({
    _id: makeMongoId(dishId),
    restaurant: { $in: restaurants.map((el) => el._id) },
  });

  if (!dish) return baseErrResponse(res, 404, "Dish not found");

  let updatedImages;
  if (!JSON.parse(req.body?.images ?? "[]").length) {
    //  if i do not send images in body is because i deleted all them and i send new files so i delete all existing one
    const promises = dish.images.map(
      async (el: any) => await deleteCloud(el.public_id)
    );

    await Promise.all(promises);

    updatedImages = await uploadUpdateDish(req.files as Express.Multer.File[]);
  } else {
    const parsed = JSON.parse(req.body.images ?? "[]");
    const parsedSet = new Set(parsed.map((el: ImageType) => el.public_id));

    const imagesToDelete = dish.images.filter(
      (el: ImageType) => !parsedSet.has(el)
    );

    const promises = imagesToDelete.map(
      async (el: ImageType) => await deleteCloud(el.public_id)
    );
    await Promise.all(promises);

    updatedImages = parsed;
  }

  if (!makeMongoId(req.body.restaurant).equals(dish.restaurant)) {
    const restaurant: HydratedDocument<RestaurantType> = restaurants.filter(
      (el) => el._id.equals(dish.restaurant)
    )?.[0];

    restaurant.dishes =
      restaurant.dishes?.length > 1
        ? restaurant.dishes.filter((el: any) => !el.equals(dish._id))
        : // element is an ObjectId and has built in equals method cause we can not compare === when work with mongo id cause are not string string but obj
          [];
    await restaurant.save();

    const newRestaurant = await Restaurant.findOne({
      owner: makeMongoId(userId),
      _id: makeMongoId(req.body.restaurant),
    });
    if (!newRestaurant)
      return baseErrResponse(res, 404, "Restaurant not found");

    newRestaurant.dishes = newRestaurant.dishes.length
      ? [...newRestaurant.dishes, dish._id]
      : [dish._id];
    await newRestaurant.save();
  }

  const { images, ...newDish } = req.body;

  dish.set({
    ...newDish,
    images: updatedImages,
  });
  await dish.save();

  return res.status(200).json({
    message: "Dish updated successfully",
    success: true,
    dishId: dish._id,
  });
};

export const bulkDelete = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { ids } = req.body;

  const result = await Restaurant.aggregate([
    {
      $match: {
        owner: makeMongoId(userId),
      },
    },

    {
      $lookup: {
        from: "dishes",
        localField: "dishes",
        foreignField: "_id",
        as: "dishes",
      },
    },

    { $unwind: "$dishes" },

    {
      $match: {
        "dishes._id": { $in: ids.map((id: string) => makeMongoId(id)) },
      },
    },

    {
      $group: {
        _id: "$_id",
        dishes: { $push: "$dishes" },
      },
    },
  ]);

  if (!result.length) return baseErrResponse(res, 404, "Dishes not found");

  const publicIdImgs = result
    .map((dishesByRest: any) =>
      dishesByRest.dishes.map((dish: any) =>
        dish.images.map((img: any) => img.public_id)
      )
    )
    .flat(Infinity);

  const promises = publicIdImgs.map(async (el: any) => await deleteCloud(el));
  await Promise.all(promises);

  let i = 0;
  do {
    const promises = result[i].dishes.map(
      async (el: any) => await Dish.findByIdAndDelete(el._id)
    );
    await Promise.all(promises);

    const restaurant = await Restaurant.findById(result[i]._id);

    const dishesIdsToDelete = new Set(
      // here i mean dishes already deleted in their collection but not as ref from point of view of restaurant
      result[i].dishes.map((el: any) => el._id)
    );
    restaurant.dishes = restaurant.dishes.filter(
      (el: any) => !dishesIdsToDelete.has(el)
    );

    await restaurant.save();

    i++;
  } while (i < result.length);

  return res.status(204).end();
};
