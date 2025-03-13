import cron from "node-cron";
export const scheduleFoodCoupon = () => cron.schedule("*/1 * * * *", () => null);
