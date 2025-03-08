"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleFoodCoupon = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const scheduleFoodCoupon = () => node_cron_1.default.schedule("*/1 * * * *", () => console.log("run"));
exports.scheduleFoodCoupon = scheduleFoodCoupon;
