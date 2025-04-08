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
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        default: null,
    },
    images: {
        type: [ImageSchema],
        default: [],
    },
}, { timestamps: true });
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
