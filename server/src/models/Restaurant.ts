import mongoose from "mongoose";
import { ImageSchema } from "./Image.js";

export type DynamicFieldRating = {
  rating: string;
  count: number;
};

export type DynamicFieldOrder = {
  status: string;
  count: number;
};

export type RestaurantType = {
  owner: string[];
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  openHours: {
    openTime: number;
    closeTime: number;
  };
  categories: string[];
  delivery: {
    estTimeDelivery: number;
    price: number;
    freeDeliveryPrice: number;
  };
  images: {
    url: string;
    public_id: string;
  }[];

  dishes: string[];
  dishesCount?: number;
  avgPrice?: number;

  orders: string[];
  ordersCount?: number;
  ordersByStatus: DynamicFieldOrder[];

  reviews: string[];
  reviewsCount?: number;
  avgRating?: number;
  reviewsByRating: DynamicFieldRating[];
};

const RestaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
    contact: {
      phone: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
      },
      website: {
        type: String,
        default: null,
      },
    },
    openHours: {
      openTime: {
        type: Number,
        required: true,
      },
      closeTime: {
        type: Number,
        required: true,
      },
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    delivery: {
      estTimeDelivery: { type: Number, required: true },
      price: { type: Number, default: 0 },
      freeDeliveryPrice: { type: Number, default: 0 },
    },
    images: [ImageSchema],
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
