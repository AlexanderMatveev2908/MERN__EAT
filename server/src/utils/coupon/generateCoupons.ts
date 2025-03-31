import User, { UserType } from "../../models/User.js";
import NonLoggedUserNewsLetter, {
  NewsletterUser,
} from "../../models/UserNewsLetter.js";
import crypto from "crypto";
import { genTokenSHA } from "../token.js";
import Coupon from "../../models/Coupon.js";
import { sendEmailCoupon } from "../mail.js";

export const genExpiryCoupon = () => new Date(Date.now() + 1000 * 60 * 2);
export const categoriesDiscount = ["fast-food", "indian"];
export const discount = 20;
export const minCartPrice = 50;

const genCoupon = () => {
  const code = crypto.randomBytes(64).toString("hex");
  const hashedCode = crypto
    .createHmac("sha256", process.env.COUPON_SIGN!)
    .update(code)
    .digest("hex");
  const expiry = genExpiryCoupon();

  return {
    code,
    hashedCode,
    expiry,
  };
};

export const generateCoupons = async () => {
  const start = performance.now();
  try {
    const users = (await User.find({
      hasSubscribedToNewsletter: true,
    }).lean()) as UserType[] | [];
    const newsUsers = (await NonLoggedUserNewsLetter.find({}).lean()) as
      | NewsletterUser[]
      | [];

    const merged = [...users, ...newsUsers];
    if (!merged.length) return;

    const promises = merged.map(async (el: UserType | NewsletterUser) => {
      const { code, hashedCode, expiry } = genCoupon();

      await Coupon.create({
        hashedCode,
        discount,
        categories: categoriesDiscount,
        minCartPrice,
        expiryDate: expiry,
      });

      const { token, hashedToken, expiryVerification } =
        genTokenSHA("newsletter");

      if ((el as UserType)?.acceptedTerms && (el as UserType)?.isVerified)
        await User.findByIdAndUpdate((el as UserType)._id, {
          "tokens.unSubScribeNewsLetter": {
            hashed: hashedToken,
            expiry: expiryVerification,
          },
        });
      else
        await NonLoggedUserNewsLetter.findByIdAndUpdate(
          (el as NewsletterUser)._id,
          {
            hashedTokenToUnsubscribe: hashedToken,
            tokenExpiry: expiryVerification,
          }
        );

      await sendEmailCoupon(el, code, token);
    });

    await Promise.all(promises);

    const currCoupons = await Coupon.countDocuments();
    if (currCoupons)
      await Coupon.updateMany(
        { expiryDate: { $lte: new Date() } },
        { $set: { isActive: false } }
      );

    const end = performance.now();

    console.log("=> END FUNC " + (end - start).toFixed(2) + " ms");
  } catch (err) {
    console.log(err);
  }
};
