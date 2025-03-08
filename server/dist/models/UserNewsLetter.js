"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NonLoggedUserNewsLetterSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedTokenToUnsubscribe: {
        type: String,
        default: null,
    },
    tokenExpiry: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
const NonLoggedUserNewsLetter = mongoose_1.default.models.NonLoggedUserNewsLetter ||
    mongoose_1.default.model("NonLoggedUserNewsLetter", NonLoggedUserNewsLetterSchema);
exports.default = NonLoggedUserNewsLetter;
