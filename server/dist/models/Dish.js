import mongoose from "mongoose";
import { ImageSchema } from "./Image.js";
const DishSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: [ImageSchema],
}, { timestamps: true });
const Dish = mongoose.models.Dish || mongoose.model("Dish", DishSchema);
export default Dish;
