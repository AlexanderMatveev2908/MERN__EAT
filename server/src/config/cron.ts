import cron from "node-cron";
import { generateCoupons } from "../utils/coupon/generateCoupons.js";

export const scheduleFoodCoupon = () =>
  cron.schedule("*/1 * * * *", async () => await generateCoupons());
