import { transporterMail } from "../config/nodemailer";
import { UserType } from "../models/User";

const basePath =
  process.env.NODE_ENV === "production"
    ? process.env.FRONT_URL
    : process.env.FRONT_URL_DEV;

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

export const sendSubScriptionNewsLetterConfirmed = async (
  user: UserType,
  token: string,
  typeUser: "non-logged" | "logged"
) => {
  if ([user, token, typeUser].some((el) => !el)) return;

  const unsubscribeURL = `${basePath}/notice-unsubscribed?userId=${user?._id}&token=${token}&typeUser=${typeUser}&action=unsubscribe`;

  await transporterMail.sendMail({
    from: process.env.MAIL_USER,
    to: user?.email as string,
    subject: "CONFIRM SUBSCRIPTION TO NEWSLETTER",
    text: `Congrats on subscribing to our newsletter 🎉\nWe will keep you update on our sales and send you unique coupon discount ✌🏼\nIf for any reason you want to unsubscribe, don't worry, you only have to click the following link: ${unsubscribeURL}`,
  });
};

export const confirmUnsubScribeNewsLetter = async (
  user: UserType,
  token: string,
  typeUser: "non-logged" | "logged"
) => {};
