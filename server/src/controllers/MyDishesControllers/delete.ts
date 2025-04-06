import { Response } from "express";
import { deleteCloud } from "../../utils/cloud.js";
import Restaurant, { RestaurantType } from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { ObjectId } from "mongoose";
import Dish, { DishType } from "../../models/Dish.js";
import { makeQueryMyDishes } from "../../utils/makeQueries/myDishes.js";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { clearDataDish } from "../../utils/clearData.js";

export const deleteDish = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { dishId } = req.params;

  const restaurantsUser = await Restaurant.find({
    owner: makeMongoId(userId),
  });
  if (!restaurantsUser.length)
    return baseErrResponse(res, 404, "Restaurant not found");

  const dish = await Dish.findOne({
    _id: makeMongoId(dishId),
    restaurant: { $in: restaurantsUser.map((el) => el._id) },
  });
  if (!dish) return baseErrResponse(res, 404, "Dish not found");

  await clearDataDish(dish);

  const currRestaurant = restaurantsUser.filter(
    (el) => el._id + "" === dish.restaurant + ""
  )[0];

  currRestaurant.dishes =
    currRestaurant.dishes.length > 1
      ? currRestaurant.dishes.filter((id: any) => !id.equals(dish._id))
      : [];

  await currRestaurant.save();

  return res.status(204).end();
};

export const bulkDelete = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { ids } = req.body;
  // here these are ids that i send from frontend after i use an array state to keep track of them

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
        //  here id id not id of dish but of document parent, the restaurant that has arr opf ref ids dishes
        dishes: { $push: "$dishes" },
      },
    },
  ]);

  if (!result.length) return baseErrResponse(res, 404, "Dishes not found");

  const promises = result.map(async (rest: any) => {
    const idsToDelete = await Promise.all(
      rest.dishes.map(async (dish: DishType) => {
        await clearDataDish(dish);
        return dish._id + "";
      })
    );

    const restaurant = await Restaurant.findById(rest._id);
    restaurant.dishes = restaurant.dishes.filter(
      (el: DishType) => !new Set(idsToDelete).has(el + "")
    );
    await restaurant.save();
  });

  await Promise.all(promises);

  return res.status(204).end();
};

export const deleteQueriesResults = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const restaurants = await Restaurant.countDocuments({
    owner: makeMongoId(userId ?? ""),
  });
  if (!restaurants) return baseErrResponse(res, 404, "Restaurants not found ");

  const queryObj: any = makeQueryMyDishes(req);
  const { queryRestaurant, queryDishes } = queryObj ?? {};

  queryRestaurant.$match = Object.keys(queryRestaurant ?? {}).length
    ? {
        ...queryRestaurant.$match,
        owner: makeMongoId(userId ?? ""),
      }
    : {
        owner: makeMongoId(userId ?? ""),
      };

  const result = await Restaurant.aggregate([
    queryRestaurant,

    {
      $lookup: {
        from: "dishes",
        localField: "dishes",
        foreignField: "_id",
        as: "dishes",
      },
    },

    { $unwind: "$dishes" },

    ...(queryDishes ? [queryDishes] : []),

    {
      $group: {
        _id: "$_id",
        count: { $sum: 1 },
        dishes: { $push: "$dishes" },
      },
    },
  ]);

  if (!result?.length) return baseErrResponse(res, 404, "Dishes not found");

  const promises = result.map(async (rest: any) => {
    const idsToDelete = await Promise.all(
      rest.dishes.map(async (dish: DishType) => {
        await clearDataDish(dish);
        return dish._id + "";
      })
    );

    const restaurant = await Restaurant.findById(rest._id);
    restaurant.dishes = restaurant.dishes.filter(
      (el: DishType) => !new Set(idsToDelete).has(el + "")
    );
    await restaurant.save();
  });

  await Promise.all(promises);

  return res.status(204).end();
};

/*
 const publicIdImgs = result
    .map((dishesByRest: any) =>
      dishesByRest.dishes.map((dish: any) =>
        dish.images.map((img: any) => img.public_id)
      )
    )
    .flat(Infinity);

  const promisesDishesImages = publicIdImgs.map(
    async (el: any) => await deleteCloud(el)
  );
  try {
    await Promise.all(promisesDishesImages);
  } catch {}

  let i = 0;
  do {
    const promises = result[i].dishes.map(
      async (el: any) => await Dish.findByIdAndDelete(el._id)
    );
    await Promise.all(promises);

    const restaurant = await Restaurant.findById(result[i]._id);

    const dishesIdsToDelete = new Set(
      // here i mean dishes already deleted in their collection but not as ref from point of view of restaurant
      result[i].dishes.map((el: any) => el._id + "")
    );
    restaurant.dishes = restaurant.dishes.filter(
      (el: any) => !dishesIdsToDelete.has(el + "")
    );

    await restaurant.save();

    i++;
  } while (i < result.length);
   */

/*
    const publicIdImages: string[] = result
    .map((obj) =>
      obj.dishes.map((dish: DishType) =>
        dish.images.map((img) => img.public_id)
      )
    )
    .flat(Infinity);

  const promisesCloud = publicIdImages.map(
    async (el: string) => await deleteCloud(el)
  );

  try {
    await Promise.all(promisesCloud);
  } catch {}

  const promises = result.map(async (obj) => {
    const idsDishes = obj.dishes.map((el: DishType) => el._id);
    await Dish.deleteMany({ _id: { $in: idsDishes } });

    const restaurant = await Restaurant.findById(obj._id);
    //  i  do not use populate cause i will works with ref ids
    restaurant.dishes = restaurant.dishes.filter(
      (currIdRef: ObjectId) =>
        !idsDishes.some((idDeleted: any) => idDeleted.equals(currIdRef))
    );
    await restaurant.save();
  });
  await Promise.all(promises);
  */
