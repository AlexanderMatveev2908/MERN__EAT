import { isDev } from "./currMode.js";
export const EXPIRY_ACCESS = isDev ? "15m" : "15m"; //basic access token
export const ACCESS_SIGN = process.env.JWT_ACCESS_SIGN;
const genExpiryAuth = () => new Date(Date.now() + 1000 * 60 * 15); //verify-email, recover-pwd
const genExpiryNews = () => new Date(Date.now() + 1000 * 60 * 30); // newsletter unsubscribe
const genExpiryManageAccount = () => new Date(Date.now() + 1000 * 60 * 15); // manage-account
const genExpiryVerifyNewEmail = () => new Date(Date.now() + 1000 * 60 * 15); // verify-new-email
export const genExpiryRefresh = () => isDev
    ? new Date(Date.now() + 1000 * 60 * 60 * 24) // refresh token for access token
    : new Date(Date.now() + 1000 * 60 * 60 * 24);
export const getSign = (type) => type === "auth"
    ? process.env.AUTH_SIGN
    : type === "manageAccount"
        ? process.env.MANAGE_ACCOUNT_SIGN
        : type === "verifyNewEmail"
            ? process.env.VERIFY_NEW_EMAIL_SIGN
            : process.env.NEWSLETTER_SIGN;
export const getExpiry = (type) => type === "auth"
    ? genExpiryAuth()
    : type === "manageAccount"
        ? genExpiryManageAccount()
        : type === "verifyNewEmail"
            ? genExpiryVerifyNewEmail()
            : genExpiryNews();
