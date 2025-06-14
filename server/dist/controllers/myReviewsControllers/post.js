var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Restaurant from "../../models/Restaurant.js";
import Review from "../../models/Review.js";
import { uploadCloudMyReviews } from "../../utils/cloud.js";
import User from "../../models/User.js";
export const getInfoRest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { restId } = req.params;
    const orders = yield Order.find({
        userId: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
        restaurantId: makeMongoId(restId),
        status: "delivered",
    }).lean();
    if (!orders.length)
        return baseErrResponse(res, 400, "User does not have eat at the restaurant");
    const restaurant = (yield Restaurant.findById(restId)
        .populate("reviews")
        .lean());
    if (!restaurant)
        return baseErrResponse(res, 404, "Restaurant not found or activity closed");
    if (restaurant.reviews.some((el) => el.user + "" === userId))
        return baseErrResponse(res, 400, "User already reviewed this restaurant");
    const avgRating = +(restaurant.reviews.reduce((acc, curr) => acc + curr.rating, 0) / restaurant.reviews.length).toFixed(2);
    restaurant.avgRating = avgRating;
    return res.status(200).json({
        success: true,
        msg: "ok",
        restaurant,
    });
});
export const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userId } = req;
    const { restId } = req.params;
    const user = (yield User.findById(userId));
    const restaurant = (yield Restaurant.findById(restId)).populate("reviews");
    if (!restaurant)
        return baseErrResponse(res, 404, "Restaurant not found");
    if ((_a = restaurant.reviews) === null || _a === void 0 ? void 0 : _a.some((el) => el.user + "" === userId))
        return baseErrResponse(res, 400, "User already reviewed this restaurant");
    let images = [];
    if ((_b = req.files) === null || _b === void 0 ? void 0 : _b.length)
        images = yield uploadCloudMyReviews(req.files);
    const newReview = yield Review.create(Object.assign(Object.assign({ user: userId, restaurant: restId }, req.body), { images }));
    user.reviews.push(newReview._id);
    yield user.save();
    // after populate document become js obj
    yield Restaurant.findByIdAndUpdate(restId, {
        $push: { reviews: newReview._id },
    });
    return res
        .status(201)
        .json({ msg: "Review created", success: true, revId: newReview._id });
});
