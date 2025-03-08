"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const currMode_1 = require("../../config/currMode");
exports.corsMiddleware = (0, cors_1.default)({
    origin: currMode_1.isDev ? process.env.FRONT_URL_DEV : process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
});
