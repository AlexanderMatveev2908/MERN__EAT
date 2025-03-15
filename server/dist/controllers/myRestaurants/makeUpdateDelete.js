var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
import { baseErrResponse, userNotFound } from "../../utils/baseErrResponse.js";
import { deleteCloud, uploadCloud } from "../../utils/cloud.js";
import { formatMyRestaurantsBody } from "../../utils/getValsMyRestaurantFromBody.js";
import { checkUserProperty } from "../../utils/checkers/myRestaurants.js";
export const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId } = req;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!user.isVerified)
        return baseErrResponse(res, 403, "User not verified");
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.phone) && !((_b = user.address) === null || _b === void 0 ? void 0 : _b.phone))
        return baseErrResponse(res, 400, "Phone number is required if not specified in profile details");
    const arrImages = yield uploadCloud(req.files);
    const newRestaurant = yield Restaurant.create(Object.assign(Object.assign({}, formatMyRestaurantsBody(req, user.email, (_c = user.address) === null || _c === void 0 ? void 0 : _c.phone)), { owner: userId, images: arrImages }));
    if (!((_d = user.restaurants) === null || _d === void 0 ? void 0 : _d.length))
        user.set({ restaurants: [newRestaurant._id] });
    else
        user.restaurants.push(newRestaurant._id);
    yield user.save();
    return res.status(201).json({ success: true, restId: newRestaurant._id });
});
export const updateMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const { user, restaurant } = yield checkUserProperty(req, res);
    if ([user, restaurant].some((el) => !el))
        return;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.phone) && !((_b = user.address) === null || _b === void 0 ? void 0 : _b.phone))
        return baseErrResponse(res, 400, "Phone number is required if not specified in profile details");
    let updatedImages;
    if (!((_e = JSON.parse((_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.restaurantImages) !== null && _d !== void 0 ? _d : "[]")) === null || _e === void 0 ? void 0 : _e.length)) {
        const promises = restaurant.images.map((img) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(img.public_id); }));
        yield Promise.all(promises);
        updatedImages = yield uploadCloud(req.files);
    }
    else {
        const parsedImgs = JSON.parse((_f = req.body.restaurantImages) !== null && _f !== void 0 ? _f : "[]");
        const reqIds = new Set(parsedImgs.map((el) => el.public_id));
        const deletedImages = restaurant.images.filter((img) => !reqIds.has(img.public_id));
        const promises = deletedImages.map((img) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(img.public_id); }));
        yield Promise.all(promises);
        updatedImages = parsedImgs;
    }
    restaurant.set(Object.assign(Object.assign({}, formatMyRestaurantsBody(req, user.email, (_g = user.address) === null || _g === void 0 ? void 0 : _g.phone)), { images: updatedImages }));
    yield restaurant.save();
    return res
        .status(200)
        .json({ msg: "Restaurant updated", success: true, restId: restaurant._id });
});
export const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, restaurant } = yield checkUserProperty(req, res);
    if ([user, restaurant].some((el) => !el))
        return;
    const promises = restaurant.images.map((img) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(img.public_id); }));
    yield Promise.all(promises);
    yield restaurant.deleteOne();
    user.restaurants = user.restaurants.filter((restId) => restId + "" !== restaurant._id + "");
    yield user.save();
    return res.status(200).json({ msg: "Restaurant deleted", success: true });
});
