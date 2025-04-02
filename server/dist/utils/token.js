var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getKeys, makeKeys } from "./keys.js";
import { CompactEncrypt, jwtDecrypt } from "jose";
import { ACCESS_SIGN, EXPIRY_ACCESS, genExpiryRefresh, getExpiry, getSign, } from "../config/tokensExpiry.js";
export const createHashedSHA = (token, type) => crypto.createHmac("sha256", getSign(type)).update(token).digest("hex");
export const genTokenSHA = (type) => {
    const token = crypto.randomBytes(64).toString("hex");
    const hashedToken = createHashedSHA(token, type);
    const expiryVerification = getExpiry(type);
    return { token, hashedToken, expiryVerification: expiryVerification };
};
export const checkTokenSHA = (receivedToken, storedToken, type) => {
    const hashedInput = crypto
        .createHmac("sha256", getSign(type))
        .update(receivedToken)
        .digest("hex");
    return hashedInput === storedToken;
};
export const genAccessJWT = (userId) => jwt.sign({ userId }, ACCESS_SIGN, {
    algorithm: "HS256",
    expiresIn: EXPIRY_ACCESS,
});
export const verifyAccessJWT = (token) => jwt.verify(token !== null && token !== void 0 ? token : "", ACCESS_SIGN);
export const decodeExpiredJWT = (token) => jwt.decode(token);
export const genTokenJWE = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = crypto.randomBytes(64).toString("hex");
    let publicKey;
    const keys = yield getKeys();
    if (!keys) {
        const { cryptoPublicKey } = yield makeKeys();
        publicKey = cryptoPublicKey;
    }
    else {
        publicKey = keys.cryptoPublicKey;
    }
    const payload = {
        userId,
        token,
    };
    const jwe = yield new CompactEncrypt(new TextEncoder().encode(JSON.stringify(payload)))
        .setProtectedHeader({ alg: "RSA-OAEP", enc: "A256GCM" })
        .encrypt(publicKey);
    const expiry = genExpiryRefresh();
    return { jwe, expiry };
    // payload is encrypted with shared symmetric key using A256GCM, the the shared symmetric key is encrypted using asymmetric public key with RSA-OAEP and can be decrypted only with private asymmetric key
});
export const checkTokenJWE = (tokenJWE) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = yield getKeys();
    let privateKey;
    if (!keys) {
        const { cryptoPrivateKey } = yield makeKeys();
        privateKey = cryptoPrivateKey;
    }
    else {
        privateKey = keys.cryptoPrivateKey;
    }
    try {
        const { payload } = yield jwtDecrypt(tokenJWE, privateKey);
        return payload;
    }
    catch (err) {
        return false;
    }
});
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
