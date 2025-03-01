import { transporterMail } from "../config/nodemailer";
import { UserType } from "../models/User";

const basePath =
  process.env.NODE_ENV === "production"
    ? process.env.FRONT_URL
    : process.env.FRONT_URL_DEV;

export const sendVerifyAccountEmail = async (
  user: Partial<UserType> | null,
  token: string
) => {
  if (!user || !token) return;

  const verificationURL = `${basePath}/auth/verify?token=${token}&userId=${user._id}&type=verify-account`;

  await transporterMail.sendMail({
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "VERIFY ACCOUNT",
    text: `Click the link to be redirected to our app and verify your account ✌🏼: ${verificationURL}`,
  });
};
