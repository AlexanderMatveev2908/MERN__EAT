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
