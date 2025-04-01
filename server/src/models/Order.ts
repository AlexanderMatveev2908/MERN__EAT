import mongoose from "mongoose";
import { ImageSchema, ImageType } from "./Image.js";
import { AddressSchema, AddressType } from "./User.js";
import { ContactRestaurantSchema } from "./Restaurant.js";

export type OrderItem = {
  dishId: string | null;

  name: string;
  price: number;
  quantity: number;
  images: ImageType[];
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = {
  paymentId: string | null;
  paymentClientSecret: string | null;
  _id?: string | mongoose.Types.ObjectId | null;
  userId: string;
  restaurantId: string;
  contactRestaurant: {
    phone: string;
    email: string;
    website: string;
  };
  items: OrderItem[];
  addressUser: AddressType;
  priceNoDiscount: number;
  priceWithDiscount: number | null;
  coupon: string | null;
  status: OrderStatus;
  delivery: number | null;
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
  images: [ImageSchema],
});

const OrderSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      default: null,
    },
    paymentClientSecret: {
      type: String,
      default: null,
    },

    // CAUSE RESTAURANT CAN BE DELETED AS WELL AS USER ACCOUNT I WILL PROVIDE AT LEAST NAME AND EMAIL FOR GENERIC INFO
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },
    contactRestaurant: ContactRestaurantSchema,
    addressUser: AddressSchema,
    items: [OrderItemSchema],
    priceNoDiscount: {
      type: Number,
      required: true,
    },
    delivery: {
      type: Number,
      default: null,
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
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
