import mongoose from "mongoose";
import { ImageSchema, ImageType } from "./Image.js";

export type DishType = {
  _id: string;
  restaurant: string;
  restaurantName: string;
  categories: string[];
  name: string;
  images: ImageType[];
  price: number;
  quantity: number;
};

const DishSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Dish = mongoose.models.Dish || mongoose.model("Dish", DishSchema);

export default Dish;
