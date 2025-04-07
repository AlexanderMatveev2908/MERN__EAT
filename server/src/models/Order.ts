import mongoose from "mongoose";
import { ImageSchema, ImageType } from "./Image.js";
import { AddressSchema, AddressType } from "./User.js";
import { ContactRestaurantSchema } from "./Restaurant.js";
import { ReviewType } from "./Review.js";

export type OrderItem = {
  dishId: string | null | mongoose.Types.ObjectId;

  name: string;
  price: number;
  quantity: number;
  images: ImageType[] | string[] | null[];
};

export const ordersStatusArr = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export type OrderStatus =
  | "pending"
  | "confirmed"
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
  restaurantName: string;
  items: OrderItem[];
  addressUser: AddressType;
  infoUser: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totPrice: number;
  delivery: number;
  timeConfirmed: Date;
  discount: number;
  coupon: string | null;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  hasLeftReview: boolean;
  reviews: mongoose.Types.ObjectId[] | string[] | ReviewType[];

  isAdmin: boolean;
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
  images: { type: [mongoose.Schema.Types.Mixed], default: [] },
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

    restaurantName: {
      type: String,
      required: true,
    },
    infoUser: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    addressUser: AddressSchema,

    items: [OrderItemSchema],
    totPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    delivery: {
      type: Number,
      default: 0,
    },
    timeConfirmed: {
      type: Date,
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
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
