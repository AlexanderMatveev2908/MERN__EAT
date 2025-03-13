"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMyRestaurants = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.uploadMyRestaurants = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 ** 2 * 5,
    },
}).fields([
    {
        name: "restaurantsImages",
        maxCount: 5,
    },
]);
