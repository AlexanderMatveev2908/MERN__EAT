export const EXPIRY_ACCESS = "10m"; //basic access token
export const ACCESS_SIGN = process.env.JWT_ACCESS_SIGN;

const GEN_EXPIRY_AUTH = () => new Date(Date.now() + 1000 * 60 * 15); //register, recover-pwd, verify-account, change-email
const GEN_EXPIRY_NEWSLETTER = () => new Date(Date.now() + 1000 * 60 * 30); // newsletter unsubscribe
const GEN_EXPIRY_MANAGE_ACCOUNT = () => new Date(Date.now() + 1000 * 60 * 15); // manage-account

export const GEN_EXPIRY_REFRESH = () => new Date(Date.now() + 1000 * 60 * 30); // refresh token for access token

export const GET_SIGN = (
  type: "auth" | "newsletter" | "manageAccount"
): string =>
  type === "auth"
    ? process.env.AUTH_SIGN!
    : type === "manageAccount"
    ? process.env.MANAGE_ACCOUNT_SIGN!
    : process.env.NEWSLETTER_SIGN!;

export const GET_EXPIRY = (
  type: "auth" | "newsletter" | "manageAccount"
): any =>
  type === "auth"
    ? GEN_EXPIRY_AUTH()
    : type === "manageAccount"
    ? GEN_EXPIRY_MANAGE_ACCOUNT()
    : GEN_EXPIRY_NEWSLETTER();
