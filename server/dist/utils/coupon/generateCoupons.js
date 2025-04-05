var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/User.js";
import NonLoggedUserNewsLetter from "../../models/UserNewsLetter.js";
import crypto from "crypto";
import { genTokenSHA } from "../token.js";
import Coupon from "../../models/Coupon.js";
import { sendEmailCoupon } from "../mail.js";
const testExp = false;
export const genExpiryCoupon = () => testExp ? new Date(0) : new Date(Date.now() + 1000 * 60 * 60);
export const categoriesDiscount = ["fast-food", "mexican"];
export const discount = 50;
export const minCartPrice = 0;
export const createCouponHashed = (code) => crypto
    .createHmac("sha256", process.env.COUPON_SIGN)
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
const genUniqueCoupon = () => __awaiter(void 0, void 0, void 0, function* () {
    let code, hashedCode, expiry;
    let existingCoupon = null;
    let attempts = 0;
    const maxAttempts = 20;
    do {
        //  can do this cause i called them same way, if they were different i should have use aliases like const {couponCode: code , hashed:hashedCode, exp:expiry} =genCoupon() so the vars would be attributed to let vars initialized above even in an inner scope
        ({ code, hashedCode, expiry } = genCoupon());
        existingCoupon = yield Coupon.findOne({ hashedCode });
        attempts++;
        if (attempts > maxAttempts)
            throw new Error("Unable to generate unique coupon");
    } while (existingCoupon);
    return {
        code,
        hashedCode,
        expiry,
    };
});
export const generateCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const start = performance.now();
    try {
        const users = (yield User.find({
            hasSubscribedToNewsletter: true,
        }).lean());
        const newsUsers = (yield NonLoggedUserNewsLetter.find({}).lean());
        const merged = [...users, ...newsUsers];
        if (!merged.length)
            return;
        const promises = merged.map((el) => __awaiter(void 0, void 0, void 0, function* () {
            const { code, hashedCode, expiry } = yield genUniqueCoupon();
            yield Coupon.create({
                hashedCode,
                discount,
                categories: categoriesDiscount,
                minCartPrice,
                expiryDate: expiry,
            });
            const { token, hashedToken, expiryVerification } = genTokenSHA("newsletter");
            if ((el === null || el === void 0 ? void 0 : el.acceptedTerms) && (el === null || el === void 0 ? void 0 : el.isVerified))
                yield User.findByIdAndUpdate(el._id, {
                    "tokens.unSubScribeNewsLetter": {
                        hashed: hashedToken,
                        expiry: expiryVerification,
                    },
                });
            else
                yield NonLoggedUserNewsLetter.findByIdAndUpdate(el._id, {
                    hashedTokenToUnsubscribe: hashedToken,
                    tokenExpiry: expiryVerification,
                });
            yield sendEmailCoupon(el, code, token);
        }));
        yield Promise.all(promises);
        const currCoupons = yield Coupon.countDocuments();
        if (currCoupons)
            yield Coupon.updateMany({ expiryDate: { $lte: new Date() } }, { $set: { isActive: false } });
        const end = performance.now();
        console.log("=> END FUNC " + (end - start).toFixed(2) + " ms");
    }
    catch (err) {
        console.log(err);
    }
});
