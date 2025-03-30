import { isDev } from "../config/currMode.js";
import { transporterMail } from "../config/nodemailer.js";
import { UserType } from "../models/User.js";
import {
  categoriesDiscount,
  discount,
  discountOverCond,
  genExpiryCoupon,
} from "./coupon/generateCoupons.js";

const basePath = isDev ? process.env.FRONT_URL_DEV : process.env.FRONT_URL;

export const sendUserEmail = async ({
  user,
  token,
  type,
}: {
  user: Partial<UserType> | null;
  token: string;
  type: string;
}) => {
  if ([user, token, type].some((el) => !el)) return;

  const verificationURL = `${basePath}/auth/verify?token=${token}&userId=${user?._id}&type=${type}`;

  await transporterMail.sendMail({
    from: process.env.MAIL_USER,
    to: user?.email as string,
    subject: type === "verify-account" ? "VERIFY ACCOUNT" : "RECOVER PASSWORD",
    text: `Click the link to be redirected to our app and ${
      type === "verify-account"
        ? "verify your account"
        : "recover your password"
    } ✌🏼: ${verificationURL}`,
  });
};

const SUB_CONFIRM_NEWSLETTER = "SUBSCRIPTION TO NEWSLETTER";
const SUB_UNSUBSCRIBE_NEWSLETTER = "UNSUBSCRIBE NEWSLETTER";

const TXT_CONFIRM_NEWSLETTER = (URL: string) =>
  `Congrats on subscribing to our newsletter 🎉\nWe will keep you update on our sales and send you unique coupon discount ✌🏼\nIf for any reason you want to unsubscribe, don't worry, you only have to click the following link: ${URL}`;
const TXT_UNSUBSCRIBE_NEWSLETTER = (
  URL: string
) => `Clicking the following link you will be redirected on our page and your subscription will be deleted, if you accidentally ask to unsubscribe you can ignore the email\n
Unsubscribe: ${URL}`;

export const sendSubScriptionNewsLetterConfirmed = async (
  user: UserType,
  token: string,
  typeUser: "non-logged" | "logged",
  action: "subscribe" | "unsubscribe"
) => {
  if ([user, token].some((el) => !el)) return;

  const unsubscribeURL = `${basePath}/newsletter/verify-unsubscribe?userId=${user?._id}&token=${token}&typeUser=${typeUser}`;

  await transporterMail.sendMail({
    from: process.env.MAIL_USER,
    to: user?.email as string,
    subject:
      action === "subscribe"
        ? SUB_CONFIRM_NEWSLETTER
        : SUB_UNSUBSCRIBE_NEWSLETTER,
    text:
      action === "subscribe"
        ? TXT_CONFIRM_NEWSLETTER(unsubscribeURL)
        : TXT_UNSUBSCRIBE_NEWSLETTER(unsubscribeURL),
  });
};

export const sendEmailChangeAccountEmail = async (
  user: UserType,
  token: string
) => {
  if (!token || !Object.keys(user ?? {})?.length) return;

  const verifyEmailURL = `${basePath}/verify-new-email?userId=${user._id}&token=${token}`;

  await transporterMail.sendMail({
    from: process.env.MAIL_USER,
    to: user?.tempNewEmail as string,
    subject: "VERIFY NEW EMAIL",
    text: `Click the link to be redirected to our app and verify your new email ✌🏼: ${verifyEmailURL}`,
  });
};

export const genTxtCouponMail = (token: string) => {
  const diffTimeSeconds = (genExpiryCoupon().getTime() - Date.now()) / 1000;
  const hours = Math.floor(diffTimeSeconds / (60 * 60));
  const minutes = Math.floor((diffTimeSeconds % (60 * 60)) / 60);
  const expiry = ` ${hours ? `${hours} hour${hours > 1 ? "s" : ""}` : ""} ${
    minutes
      ? `${hours ? "and " : ""}${minutes} minute${minutes > 1 ? "s" : ""}`
      : ""
  }`;

  const categories =
    categoriesDiscount.length > 1
      ? categoriesDiscount
          .map((el, i, arg) =>
            i === arg.length - 1
              ? "and " + el.toUpperCase()
              : i === arg.length - 2
              ? el.toUpperCase() + " "
              : el.toUpperCase() + ", "
          )
          .join("")
      : categoriesDiscount[0].toUpperCase();

  return `Good news, for the next${expiry}, you will have a discount on ${categories} categor${
    categoriesDiscount.length > 1 ? "ies" : "y"
  }, of ${discount}, over an order of $${discountOverCond.toFixed(
    2
  )}, with following code ✌🏼\n${token}\n`;
};

export const sendEmailCoupon = async (user: UserType, token: string) => {
  if (!user || !token) return;

  await transporterMail.sendMail({
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "SPECIAL OFFER 🎉",
    text: genTxtCouponMail(token),
  });
};
