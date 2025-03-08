import { isDev } from "./currMode";

export const EXPIRY_ACCESS = isDev ? "5m" : "15m"; //basic access token
export const ACCESS_SIGN = process.env.JWT_ACCESS_SIGN;

const GEN_EXPIRY_AUTH = () => new Date(Date.now() + 1000 * 60 * 15); //verify-email, recover-pwd
const GEN_EXPIRY_NEWSLETTER = () => new Date(Date.now() + 1000 * 60 * 30); // newsletter unsubscribe
const GEN_EXPIRY_MANAGE_ACCOUNT = () => new Date(Date.now() + 1000 * 60 * 15); // manage-account
const GEN_EXPIRY_VERIFY_NEW_EMAIL = () => new Date(Date.now() + 1000 * 60 * 15); // verify-new-email

export const GEN_EXPIRY_REFRESH = () =>
  isDev
    ? new Date(Date.now() + 1000 * 60 * 60 * 48)
    : new Date(Date.now() + 1000 * 60 * 30); // refresh token for access token

export const GET_SIGN = (
  type: "auth" | "newsletter" | "manageAccount" | "verifyNewEmail"
): string =>
  type === "auth"
    ? process.env.AUTH_SIGN!
    : type === "manageAccount"
    ? process.env.MANAGE_ACCOUNT_SIGN!
    : type === "verifyNewEmail"
    ? process.env.VERIFY_NEW_EMAIL_SIGN!
    : process.env.NEWSLETTER_SIGN!;

export const GET_EXPIRY = (
  type: "auth" | "newsletter" | "manageAccount" | "verifyNewEmail"
): any =>
  type === "auth"
    ? GEN_EXPIRY_AUTH()
    : type === "manageAccount"
    ? GEN_EXPIRY_MANAGE_ACCOUNT()
    : type === "verifyNewEmail"
    ? GEN_EXPIRY_VERIFY_NEW_EMAIL()
    : GEN_EXPIRY_NEWSLETTER();
