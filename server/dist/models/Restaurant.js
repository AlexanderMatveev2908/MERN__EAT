"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RestaurantSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Dish",
        },
    ],
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    reviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
}, { timestamps: true });
const Restaurant = mongoose_1.default.models.Restaurant || mongoose_1.default.model("Restaurant", RestaurantSchema);
exports.default = Restaurant;
