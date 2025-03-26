var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteCloud } from "../../utils/cloud.js";
import Restaurant from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish from "../../models/Dish.js";
import { makeQueryMyDishes } from "../../utils/makeQueries/myDishes.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
export const deleteDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { dishId } = req.params;
    const restaurantsUser = yield Restaurant.find({
        owner: makeMongoId(userId),
    });
    if (!restaurantsUser.length)
        return baseErrResponse(res, 404, "Restaurant not found");
    const dish = yield Dish.findOne({
        _id: makeMongoId(dishId),
        restaurant: { $in: restaurantsUser.map((el) => el._id) },
    });
    if (!dish)
        return baseErrResponse(res, 404, "Dish not found");
    try {
        let i = 0;
        do {
            yield deleteCloud(dish.images[i].public_id);
            i++;
        } while (i < dish.images.length);
    }
    catch (_a) { }
    const result = yield Dish.findOneAndDelete({
        _id: makeMongoId(dishId),
        restaurant: dish.restaurant,
    });
    if (!result)
        return baseErrResponse(res, 404, "Dish not found");
    const currRestaurant = restaurantsUser.filter((el) => el._id + "" === dish.restaurant + "")[0];
    currRestaurant.dishes =
        currRestaurant.dishes.length > 1
            ? currRestaurant.dishes.filter((id) => !id.equals(dish._id))
            : [];
    yield currRestaurant.save();
    return res.status(204).end();
});
export const bulkDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { ids } = req.body;
    // here these are ids that i send from frontend after i use an array state to keep track of them
    const result = yield Restaurant.aggregate([
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
                "dishes._id": { $in: ids.map((id) => makeMongoId(id)) },
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
    if (!result.length)
        return baseErrResponse(res, 404, "Dishes not found");
    const publicIdImgs = result
        .map((dishesByRest) => dishesByRest.dishes.map((dish) => dish.images.map((img) => img.public_id)))
        .flat(Infinity);
    const promisesDishesImages = publicIdImgs.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(el); }));
    try {
        yield Promise.all(promisesDishesImages);
    }
    catch (_a) { }
    let i = 0;
    do {
        const promises = result[i].dishes.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield Dish.findByIdAndDelete(el._id); }));
        yield Promise.all(promises);
        const restaurant = yield Restaurant.findById(result[i]._id);
        const dishesIdsToDelete = new Set(
        // here i mean dishes already deleted in their collection but not as ref from point of view of restaurant
        result[i].dishes.map((el) => el._id + ""));
        restaurant.dishes = restaurant.dishes.filter((el) => !dishesIdsToDelete.has(el + ""));
        yield restaurant.save();
        i++;
    } while (i < result.length);
    return res.status(204).end();
});
export const deleteQueriesResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const restaurants = yield Restaurant.countDocuments({
        owner: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    });
    if (!restaurants)
        return baseErrResponse(res, 404, "Restaurants not found ");
    const queryObj = makeQueryMyDishes(req);
    const { queryRestaurant, queryDishes } = queryObj !== null && queryObj !== void 0 ? queryObj : {};
    queryRestaurant.$match = Object.keys(queryRestaurant !== null && queryRestaurant !== void 0 ? queryRestaurant : {}).length
        ? Object.assign(Object.assign({}, queryRestaurant.$match), { owner: makeMongoId(userId !== null && userId !== void 0 ? userId : "") }) : {
        owner: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    };
    const result = yield Restaurant.aggregate([
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
    if (!(result === null || result === void 0 ? void 0 : result.length))
        return baseErrResponse(res, 404, "Dishes not found");
    const publicIdImages = result
        .map((obj) => obj.dishes.map((dish) => dish.images.map((img) => img.public_id)))
        .flat(Infinity);
    const promisesCloud = publicIdImages.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(el); }));
    try {
        yield Promise.all(promisesCloud);
    }
    catch (_a) { }
    const promises = result.map((obj) => __awaiter(void 0, void 0, void 0, function* () {
        const idsDishes = obj.dishes.map((el) => el._id);
        yield Dish.deleteMany({ _id: { $in: idsDishes } });
        const restaurant = yield Restaurant.findById(obj._id);
        //  i  do not use populate cause i will works with ref ids
        restaurant.dishes = restaurant.dishes.filter((currIdRef) => !idsDishes.some((idDeleted) => idDeleted.equals(currIdRef)));
        yield restaurant.save();
    }));
    yield Promise.all(promises);
    return res.status(204).end();
});
