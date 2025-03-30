import User from "../../models/User.js";
import NonLoggedUserNewsLetter from "../../models/UserNewsLetter.js";
import crypto from "crypto";

export const genExpiryCoupon = () =>
  new Date(Date.now() + 1000 * 60 * 60 * 2.2);
export const categoriesDiscount = ["fast-food", "indian"];
export const discount = 20;
export const discountOverCond = 50;

export const generateCoupons = async () => {
  try {
    const users = await User.find({}).lean();
    const newsUsers = await NonLoggedUserNewsLetter.find({}).lean();

    const merged = [...users, newsUsers];
    if (!merged.length) return;

    const promises = merged.map(async (el: any) => {
      const token = crypto.randomBytes(64).toString("hex");
      const hashed = crypto
        .createHmac("sha256", process.env.COUPON_SIGN!)
        .update(token)
        .digest("hex");
      const expiry = genExpiryCoupon();
    });
  } catch (err) {
    console.log(err);
  }
};
