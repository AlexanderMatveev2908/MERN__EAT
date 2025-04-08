var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Review from "../../models/Review.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import { deleteCloud, uploadCloudMyReviews } from "../../utils/cloud.js";
export const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { revId } = req.params;
    const review = yield Review.findOne({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
        _id: makeMongoId(revId),
    }).populate({
        path: "restaurant",
        populate: {
            path: "reviews",
        },
    });
    if (!review)
        return baseErrResponse(res, 404, "Review not found");
    review.restaurant = Object.assign(Object.assign({}, review.restaurant), { avgRating: +(review.restaurant.reviews.reduce((acc, curr) => acc + curr.rating, 0) / review.restaurant.reviews.length).toFixed(2) });
    return res.status(200).json({ msg: "ok", success: true, review });
});
export const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { revId } = req.params;
    let updatedImages = [];
    const review = (yield Review.findById(revId));
    if (!review)
        return baseErrResponse(res, 404, "Review not found");
    const existingImages = JSON.parse((_a = req.body.images) !== null && _a !== void 0 ? _a : "[]");
    const newFiles = req.files;
    if (existingImages.length) {
        const idsDelete = review.images
            .filter((img) => !new Set(existingImages.map((el) => el.public_id)).has(img.public_id))
            .map((img) => img.public_id);
        if (idsDelete.length) {
            try {
                yield Promise.all(idsDelete.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(id); })));
            }
            catch (_b) { }
        }
        updatedImages = existingImages;
    }
    else if (newFiles.length) {
        if (review.images.length) {
            try {
                yield Promise.all(review.images.map((img) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(img.public_id); })));
            }
            catch (_c) { }
        }
        updatedImages = yield uploadCloudMyReviews(req.files);
    }
    review.title = req.body.title;
    review.rating = +req.body.rating;
    review.comment = req.body.comment || null;
    review.images = updatedImages;
    yield review.save();
    return res.status(200).json({ msg: "ok", success: true });
});
