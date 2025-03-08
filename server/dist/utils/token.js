"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenJWE = exports.genTokenJWE = exports.decodeExpiredJWT = exports.verifyAccessJWT = exports.genAccessJWT = exports.checkTokenSHA = exports.genTokenSHA = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jose_1 = require("jose");
const keys_1 = require("./keys");
const signs_1 = require("../config/signs");
const genTokenSHA = (type) => {
    const token = crypto_1.default.randomBytes(64).toString("hex");
    const hashedToken = crypto_1.default
        .createHmac("sha256", (0, signs_1.GET_SIGN)(type))
        .update(token)
        .digest("hex");
    const expiryVerification = (0, signs_1.GET_EXPIRY)(type);
    return { token, hashedToken, expiryVerification: expiryVerification };
};
exports.genTokenSHA = genTokenSHA;
const checkTokenSHA = (receivedToken, storedToken, type) => {
    const hashedInput = crypto_1.default
        .createHmac("sha256", (0, signs_1.GET_SIGN)(type))
        .update(receivedToken)
        .digest("hex");
    return hashedInput === storedToken;
};
exports.checkTokenSHA = checkTokenSHA;
const genAccessJWT = (userId) => jsonwebtoken_1.default.sign({ userId }, signs_1.ACCESS_SIGN, {
    algorithm: "HS256",
    expiresIn: signs_1.EXPIRY_ACCESS,
});
exports.genAccessJWT = genAccessJWT;
const verifyAccessJWT = (token) => jsonwebtoken_1.default.verify(token !== null && token !== void 0 ? token : "", signs_1.ACCESS_SIGN);
exports.verifyAccessJWT = verifyAccessJWT;
const decodeExpiredJWT = (token) => jsonwebtoken_1.default.decode(token);
exports.decodeExpiredJWT = decodeExpiredJWT;
const genTokenJWE = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = crypto_1.default.randomBytes(64).toString("hex");
    let publicKey;
    const keys = yield (0, keys_1.getKeys)();
    if (!keys) {
        const { cryptoPublicKey } = yield (0, keys_1.makeKeys)();
        publicKey = cryptoPublicKey;
    }
    else {
        publicKey = keys.cryptoPublicKey;
    }
    const payload = {
        userId,
        token,
    };
    const jwe = yield new jose_1.CompactEncrypt(new TextEncoder().encode(JSON.stringify(payload)))
        .setProtectedHeader({ alg: "RSA-OAEP", enc: "A256GCM" })
        .encrypt(publicKey);
    const expiry = (0, signs_1.GEN_EXPIRY_REFRESH)();
    return { jwe, expiry };
    // payload is encrypted with shared symmetric key using A256GCM, the the shared symmetric key is encrypted using asymmetric public key with RSA-OAEP and can be decrypted only with private asymmetric key
});
exports.genTokenJWE = genTokenJWE;
const checkTokenJWE = (tokenJWE) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = yield (0, keys_1.getKeys)();
    let privateKey;
    if (!keys) {
        const { cryptoPrivateKey } = yield (0, keys_1.makeKeys)();
        privateKey = cryptoPrivateKey;
    }
    else {
        privateKey = keys.cryptoPrivateKey;
    }
    try {
        const { payload } = yield (0, jose_1.jwtDecrypt)(tokenJWE, privateKey);
        return payload;
    }
    catch (err) {
        return false;
    }
});
exports.checkTokenJWE = checkTokenJWE;
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
