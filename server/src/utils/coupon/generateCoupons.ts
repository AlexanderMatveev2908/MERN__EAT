import User, { UserType } from "../../models/User.js";
import NonLoggedUserNewsLetter, {
  NewsletterUser,
} from "../../models/UserNewsLetter.js";
import crypto from "crypto";
import { genTokenSHA } from "../token.js";
import Coupon from "../../models/Coupon.js";
import { sendEmailCoupon } from "../mail.js";

const testExp = false;

export const genExpiryCoupon = () =>
  testExp ? new Date(0) : new Date(Date.now() + 1000 * 60 * 60);
export const categoriesDiscount = ["fast-food", "mexican"];
export const discount = 50;
export const minCartPrice = 0;

export const createCouponHashed = (code: string) =>
  crypto
    .createHmac("sha256", process.env.COUPON_SIGN!)
    .update(code)
    .digest("hex");

const genCoupon = () => {
  const code = crypto.randomBytes(8).toString("hex");
  const hashedCode = createCouponHashed(code);
  const expiry = genExpiryCoupon();

  return {
    code,
    hashedCode,
    expiry,
  };
};

const genUniqueCoupon = async () => {
  let code, hashedCode, expiry;
  let existingCoupon = null;

  let attempts = 0;
  const maxAttempts = 20;
  do {
    //  can do this cause i called them same way, if they were different i should have use aliases like const {couponCode: code , hashed:hashedCode, exp:expiry} =genCoupon() so the vars would be attributed to let vars initialized above even in an inner scope
    ({ code, hashedCode, expiry } = genCoupon());

    existingCoupon = await Coupon.findOne({ hashedCode });

    attempts++;

    if (attempts > maxAttempts)
      throw new Error("Unable to generate unique coupon");
  } while (existingCoupon);

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
      const { code, hashedCode, expiry } = await genUniqueCoupon();

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
