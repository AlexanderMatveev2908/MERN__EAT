var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import { uploadCloudStorage } from "../../utils/cloud.js";
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
    // console.log(req.uploadedFiles);
    const arrFiles = Object.entries(files).map(([key, val]) => ({
        [key]: val,
    }));
    const arrReturnedPromises = arrFiles.map((dishFiles, i) => __awaiter(void 0, void 0, void 0, function* () {
        const images = yield uploadCloudStorage(dishFiles[`images_${i}`]);
        return images;
    }));
    const dataImages = yield Promise.all(arrReturnedPromises);
    // console.log(dataImages);
    // console.log(form);
    const promisesDishes = form.dishes.map((el, i) => __awaiter(void 0, void 0, void 0, function* () {
        const newDish = yield Dish.create(Object.assign(Object.assign({}, el), { restaurant: existingRestaurant._id, images: dataImages[i] }));
        return newDish._id;
    }));
    const arrIdsDishes = yield Promise.all(promisesDishes);
    if (!((_a = existingRestaurant.dishes) === null || _a === void 0 ? void 0 : _a.length))
        existingRestaurant.dishes = arrIdsDishes;
    else
        existingRestaurant.dishes = [
            ...existingRestaurant.myDishesFieldsSearch,
            ...arrIdsDishes,
        ];
    yield existingRestaurant.save();
    return res.status(200).json({ message: "Dish created successfully" });
});
