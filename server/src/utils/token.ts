import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWTUserId } from "../middleware/general/verifyAccessToken";
import { CompactEncrypt, jwtDecrypt } from "jose";
import { getKeys, makeKeys } from "./formatPEM";
import {
  ACCESS_SIGN,
  EXPIRY_ACCESS,
  GEN_EXPIRY_REFRESH,
  GET_EXPIRY,
  GET_SIGN,
} from "../config/signs";

type ReturnToken = {
  token: string;
  hashedToken: string;
  expiryVerification: Date;
};

export const genTokenSHA = (
  type: "auth" | "newsletter" | "manageAccount" | "verifyNewEmail"
): ReturnToken => {
  const token = crypto.randomBytes(64).toString("hex");

  const hashedToken = crypto
    .createHmac("sha256", GET_SIGN(type)!)
    .update(token)
    .digest("hex");

  const expiryVerification = GET_EXPIRY(type);

  return { token, hashedToken, expiryVerification: expiryVerification as Date };
};

export const checkTokenSHA = (
  receivedToken: string,
  storedToken: string,
  type: "auth" | "newsletter" | "manageAccount" | "verifyNewEmail"
): boolean => {
  const hashedInput = crypto
    .createHmac("sha256", GET_SIGN(type)!)
    .update(receivedToken)
    .digest("hex");

  return hashedInput === storedToken;
};

export const genAccessJWT = (userId: string): any =>
  jwt.sign({ userId }, ACCESS_SIGN!, {
    algorithm: "HS256",
    expiresIn: EXPIRY_ACCESS,
  });

export const verifyAccessJWT = (token: string) =>
  jwt.verify(token ?? "", ACCESS_SIGN!) as JWTUserId;

// export const decodeExpiredJWT = (token: string) :any=> jwt.decode(token);

export const genTokenJWE = async (userId: string): Promise<any> => {
  const token = crypto.randomBytes(64).toString("hex");

  let publicKey;

  const keys = await getKeys();
  if (!keys) {
    const { cryptoPublicKey } = await makeKeys();
    publicKey = cryptoPublicKey;
  } else {
    publicKey = keys.cryptoPublicKey;
  }

  const payload = {
    userId,
    token,
  };

  const jwe = await new CompactEncrypt(
    new TextEncoder().encode(JSON.stringify(payload))
  )
    .setProtectedHeader({ alg: "RSA-OAEP", enc: "A256GCM" })
    .encrypt(publicKey);

  const expiry = GEN_EXPIRY_REFRESH();

  return { jwe, expiry };

  // payload is encrypted with shared symmetric key using A256GCM, the the shared symmetric key is encrypted using asymmetric public key with RSA-OAEP and can be decrypted only with private asymmetric key
};

export const checkTokenJWE = async (tokenJWE: string): Promise<any> => {
  const keys = await getKeys();

  let privateKey;

  if (!keys) {
    const { cryptoPrivateKey } = await makeKeys();
    privateKey = cryptoPrivateKey;
  } else {
    privateKey = keys.cryptoPrivateKey;
  }

  try {
    const { payload } = await jwtDecrypt(tokenJWE, privateKey);
    return payload;
  } catch (err: any) {
    // console.log(err);
    return false;
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
