"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const KeySchema = new mongoose_1.default.Schema({
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    iV: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Key = mongoose_1.default.models.Key || mongoose_1.default.model("Key", KeySchema);
exports.default = Key;
