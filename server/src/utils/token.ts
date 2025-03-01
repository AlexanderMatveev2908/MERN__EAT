import crypto from "crypto";

export const genTokenSHA = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHmac("sha256", process.env.AUTH_SIGN!)
    .update(token)
    .digest("hex");
  const expiryVerification = Date.now() + 1000 * 60;

  return { token, hashedToken, expiryVerification };
};

export const checkTokenSHA = (receivedToken: string, storedToken: string) => {
  const hashedInput = crypto
    .createHmac("sha256", process.env.AUTH_SIGN!)
    .update(receivedToken)
    .digest("hex");

  return hashedInput === storedToken;
};
