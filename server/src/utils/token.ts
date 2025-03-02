import crypto from "crypto";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { JWTPayload } from "express-oauth2-jwt-bearer";

const EXPIRY_AUTH = Date.now() + 1000 * 60 * 5;
const EXPIRY_ACCESS = "5m";
const EXPIRY_REFRESH = Date.now() + 1000 * 60 * 15;

type ReturnToken = {
  token: string;
  hashedToken: string;
  expiryVerification: Date;
};

export const genTokenSHA = (): ReturnToken => {
  const token = crypto.randomBytes(64).toString("hex");
  const hashedToken = crypto
    .createHmac("sha256", process.env.AUTH_SIGN!)
    .update(token)
    .digest("hex");
  const expiryVerification = new Date(EXPIRY_AUTH);

  return { token, hashedToken, expiryVerification };
};

export const checkTokenSHA = (
  receivedToken: string,
  storedToken: string
): boolean => {
  const hashedInput = crypto
    .createHmac("sha256", process.env.AUTH_SIGN!)
    .update(receivedToken)
    .digest("hex");

  return hashedInput === storedToken;
};

export const genAccessJWT = (userId: string): string =>
  jwt.sign({ userId }, process.env.JWT_ACCESS_SIGN!, {
    algorithm: "HS256",
    expiresIn: EXPIRY_ACCESS,
  });

export const verifyAccessJWT = (token: string): JWTPayload | string => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SIGN!);
  } catch (err: any) {
    if (err.name === "TokenExpiredError") return "Access Token Expired";
    return "Invalid Access Token";
  }
};

// first time i use argon, i decided to use it cause i was reading about different algorithm for interest, ARGON2d if i get it is like more resistant against GPU attacks that have a lots of cores, and args2 handle the brute force attacks cause it use a lot of memory slowing attacks down, ARGON2i is thought for side channel attacks cause it use fixed memory cost for each password length so is harder to understand timing of algorithm for different passwords, ARGON2id is a between version
export const genRefreshArg = async (): Promise<ReturnToken> => {
  const token = crypto.randomBytes(64).toString("hex");
  const hashedToken = await argon2.hash(token, {
    type: argon2.argon2d,
    parallelism: 4,
    timeCost: 3,
    memoryCost: 2 ** 16,
  });
  const expiryVerification = new Date(EXPIRY_REFRESH);

  return { token, hashedToken, expiryVerification };
};

export const verifyRefreshArg = async (
  token: string,
  hashedToken: string | null
): Promise<boolean> => await argon2.verify(hashedToken ?? "", token);
