import mongoose from "mongoose";

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
        required: true,
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
        type: String,
        required: true,
      },
      closeTime: {
        type: String,
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
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
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
