import mongoose from "mongoose";
import { ImageSchema } from "./Image.js";
const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    images: [ImageSchema],
});
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
