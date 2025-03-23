var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import fs from "fs";
import { deleteCloud, uploadCloudStorage, uploadUpdateDish, } from "../../utils/cloud.js";
import Restaurant from "../../models/Restaurant.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import mongoose from "mongoose";
import Dish from "../../models/Dish.js";
const makeMongoId = (id) => new mongoose.Types.ObjectId(id);
export const createDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { restId } = req.query;
    const form = req.body;
    const files = req.files;
    const existingRestaurant = yield Restaurant.findOne({
        _id: makeMongoId(restId),
        owner: makeMongoId(userId),
    });
    if (!existingRestaurant) {
        for (const file of files) {
            if (fs.existsSync(file.path))
                fs.unlinkSync(file.path);
        }
        return baseErrResponse(res, 404, "Restaurant not found");
    }
    const arrFiles = Object.entries(files).map(([key, val]) => ({
        [key]: val,
    }));
    // form an obj of files provided by multer i create an array for each dish that keeps an array of files relative to dish
    const arrReturnedPromises = arrFiles.map((dishFiles, i) => __awaiter(void 0, void 0, void 0, function* () {
        // each array will be uploaded by block, upload cloud storage map all files and return Promise.all
        const images = yield uploadCloudStorage(dishFiles[`images_${i}`]);
        return images;
    }));
    const dataImages = yield Promise.all(arrReturnedPromises);
    // now i have array or array of results from cloudinary
    const promisesDishes = form.dishes.map((el, i) => __awaiter(void 0, void 0, void 0, function* () {
        // i tried to organize all as better as i could to ge easier for both frontend and backend work with data, dishes are send as obj that keeps array of subForms of main form
        const newDish = yield Dish.create(Object.assign(Object.assign({}, el), { restaurant: existingRestaurant._id, images: dataImages[i] }));
        return newDish._id;
    }));
    const arrIdsDishes = yield Promise.all(promisesDishes);
    // now need to update restaurant to be up to date with fresh dishes
    if (!((_a = existingRestaurant.dishes) === null || _a === void 0 ? void 0 : _a.length))
        existingRestaurant.dishes = arrIdsDishes;
    else
        existingRestaurant.dishes = [...existingRestaurant.dishes, ...arrIdsDishes];
    yield existingRestaurant.save();
    return res.status(200).json({
        message: "Dishes created successfully",
        success: true,
        restId: existingRestaurant._id,
    });
});
export const updateDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { userId } = req;
    const { dishId } = req.params;
    const restaurants = yield Restaurant.find({ owner: makeMongoId(userId) });
    if (!restaurants.length)
        return baseErrResponse(res, 404, "Restaurant not found");
    const dish = yield Dish.findOne({
        _id: makeMongoId(dishId),
        restaurant: { $in: restaurants.map((el) => el._id) },
    });
    if (!dish)
        return baseErrResponse(res, 404, "Dish not found");
    let updatedImages;
    if (!JSON.parse((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.images) !== null && _b !== void 0 ? _b : "[]").length) {
        //  if i do not send images in body is because i deleted all them and i send new files so i delete all existing one
        const promises = dish.images.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(el.public_id); }));
        yield Promise.all(promises);
        updatedImages = yield uploadUpdateDish(req.files);
    }
    else {
        const parsed = JSON.parse((_c = req.body.images) !== null && _c !== void 0 ? _c : "[]");
        const parsedSet = new Set(parsed.map((el) => el.public_id));
        const imagesToDelete = dish.images.filter((el) => !parsedSet.has(el));
        const promises = imagesToDelete.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(el.public_id); }));
        yield Promise.all(promises);
        updatedImages = parsed;
    }
    if (!makeMongoId(req.body.restaurant).equals(dish.restaurant)) {
        const restaurant = (_d = restaurants.filter((el) => el._id.equals(dish.restaurant))) === null || _d === void 0 ? void 0 : _d[0];
        restaurant.dishes =
            ((_e = restaurant.dishes) === null || _e === void 0 ? void 0 : _e.length) > 1
                ? restaurant.dishes.filter((el) => !el.equals(dish._id))
                : // element is an ObjectId and has built in equals method cause we can not compare === when work with mongo id cause are not string string but obj
                    [];
        yield restaurant.save();
        const newRestaurant = yield Restaurant.findOne({
            owner: makeMongoId(userId),
            _id: makeMongoId(req.body.restaurant),
        });
        if (!newRestaurant)
            return baseErrResponse(res, 404, "Restaurant not found");
        newRestaurant.dishes = ((_f = newRestaurant.dishes) === null || _f === void 0 ? void 0 : _f.length)
            ? [...newRestaurant.dishes, dish._id]
            : [dish._id];
        yield newRestaurant.save();
    }
    const _g = req.body, { images } = _g, newDish = __rest(_g, ["images"]);
    dish.set(Object.assign(Object.assign({}, newDish), { images: updatedImages }));
    yield dish.save();
    return res.status(200).json({
        message: "Dish updated successfully",
        success: true,
        dishId: dish._id,
    });
});
