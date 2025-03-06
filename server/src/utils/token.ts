import crypto, { createPrivateKey, createPublicKey } from "crypto";
import jwt from "jsonwebtoken";
import { JWTUserId } from "../middleware/general/verifyAccessToken";
import { CompactEncrypt, jwtDecrypt } from "jose";
import { getFormattedPEMKeys } from "./formatPEM";

const EXPIRY_ACCESS = "15m"; //basic access token
const genExpiryAuth = () => new Date(Date.now() + 1000 * 60 * 5); //register, recover-pwd, verify-account
const genExpiryRefresh = () => new Date(Date.now() + 1000 * 60 * 60); // refresh token for access token

type ReturnToken = {
  token: string;
  hashedToken: string;
  expiryVerification: Date;
};

export const genTokenSHA = (type: "auth" | "refresh"): ReturnToken => {
  const token = crypto.randomBytes(64).toString("hex");

  const sign =
    type === "auth" ? process.env.AUTH_SIGN : process.env.REFRESH_SIGN;

  const hashedToken = crypto
    .createHmac("sha256", sign!)
    .update(token)
    .digest("hex");

  const expiryVerification =
    type === "auth" ? genExpiryAuth() : genExpiryRefresh();

  return { token, hashedToken, expiryVerification };
};

export const genHashedInput = (token: string) =>
  crypto
    .createHmac("sha256", process.env.REFRESH_SIGN!)
    .update(token)
    .digest("hex");

export const checkTokenSHA = (
  receivedToken: string,
  storedToken: string,
  type: "auth" | "refresh"
): boolean => {
  const sign =
    type === "auth" ? process.env.AUTH_SIGN : process.env.REFRESH_SIGN;

  const hashedInput = crypto
    .createHmac("sha256", sign!)
    .update(receivedToken)
    .digest("hex");

  return hashedInput === storedToken;
};

export const genAccessJWT = (userId: string): string =>
  jwt.sign({ userId }, process.env.JWT_ACCESS_SIGN!, {
    algorithm: "HS256",
    expiresIn: EXPIRY_ACCESS,
  });

export const verifyAccessJWT = (token: string) =>
  jwt.verify(token ?? "", process.env.JWT_ACCESS_SIGN!) as JWTUserId;

export const genTokenJWE = async (userId: string) => {
  const token = crypto.randomBytes(64).toString("hex");

  const publicKey = getFormattedPEMKeys("PUBLIC");
  const cryptoPublicKey = createPublicKey(publicKey);
  const payload = {
    userId,
    token,
  };

  const jwe = await new CompactEncrypt(
    new TextEncoder().encode(JSON.stringify(payload))
  )
    .setProtectedHeader({ alg: "RSA-OAEP", enc: "A256GCM" })
    .encrypt(cryptoPublicKey);

  const expiry = genExpiryRefresh();

  return { jwe, expiry };

  // payload is encrypted with shared symmetric key using A256GCM, the the shared symmetric kwy in encrypted using asymmetric public key with RSA-OAEP and can be decrypted only with private asymmetric ket
};

export const checkTokenJWE = async (tokenJWE: string) => {
  const privateKey = getFormattedPEMKeys("PRIVATE");

  const cryptoPrivateKey = createPrivateKey(privateKey);

  try {
    const { payload } = await jwtDecrypt(tokenJWE, cryptoPrivateKey);

    return payload;
  } catch (err: any) {
    return "  INVALID TOKEN";
  }
};

// first time i use argon, i decided to use it cause i was reading about different algorithm for interest, ARGON2d if i get it is like more resistant against GPU attacks that have a lots of cores, and args2 handle the brute force attacks cause it use a lot of memory slowing attacks down, ARGON2i is thought for side channel attacks cause it use fixed memory cost for each password length so is harder to understand timing of algorithm for different passwords, ARGON2id is a between version
// export const genRefreshArg = async (): Promise<ReturnToken> => {
//   const token = crypto.randomBytes(64).toString("hex");
//   const hashedToken = await argon2.hash(token, {
//     type: argon2.argon2d,
//     parallelism: 4,
//     timeCost: 3,
//     memoryCost: 2 ** 16,
//   });
//   const expiryVerification = new Date(EXPIRY_REFRESH);

//   return { token, hashedToken, expiryVerification };
// };

// export const verifyRefreshArg = async (
//   token: string,
//   hashedToken: string | null
// ): Promise<boolean> => await argon2.verify(hashedToken ?? "", token);
