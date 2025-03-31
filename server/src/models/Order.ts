import mongoose from "mongoose";
import { ImageSchema, ImageType } from "./Image.js";
import { AddressSchema } from "./User.js";

export type OrderItem = {
  dishId: string | null;

  name: string;
  price: number;
  quantity: number;
  images: ImageType[];
};

export type OrderStatus =
  | "created"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = {
  _id?: string;
  userId: string;
  userEmail: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  priceNoDiscount: number;
  priceWithDiscount: number | null;
  coupon: string | null;
  status: OrderStatus;
};

const OrderItemSchema = new mongoose.Schema({
  dishId: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
    default: null,
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
  image: [ImageSchema],
});

const OrderSchema = new mongoose.Schema(
  {
    // CAUSE RESTAURANT CAN BE DELETED AS WELL AS USER ACCOUNT I WILL PROVIDE AT LEAST NAME AND EMAIL FOR GENERIC INFO
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userEmail: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
    restaurantName: {
      type: String,
      required: true,
    },

    address: AddressSchema,

    items: [OrderItemSchema],
    priceNoDiscount: {
      type: Number,
      required: true,
    },
    priceWithDiscount: {
      type: Number,
      default: null,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "created",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
