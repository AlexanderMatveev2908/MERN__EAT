import mongoose from "mongoose";
import { ImageSchema } from "./Image.js";
import { AddressSchema } from "./User.js";
import { ContactRestaurantSchema } from "./Restaurant.js";
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
const OrderSchema = new mongoose.Schema({
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
}, { timestamps: true });
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
