var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Key from "../models/Key.js";
import crypto from "crypto";
export const getKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const keysArr = yield Key.find({});
    if (!(keysArr === null || keysArr === void 0 ? void 0 : keysArr.length))
        return false;
    const { decryptedPrivateKey, decryptedPublicKey } = decryptMyKeys(keysArr[0].publicKey, keysArr[0].privateKey, keysArr[0].iV);
    const cryptoPublicKey = crypto.createPublicKey(decryptedPublicKey !== null && decryptedPublicKey !== void 0 ? decryptedPublicKey : "");
    const cryptoPrivateKey = crypto.createPrivateKey(decryptedPrivateKey !== null && decryptedPrivateKey !== void 0 ? decryptedPrivateKey : "");
    return { cryptoPublicKey, cryptoPrivateKey };
});
export const makeKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
    });
    const publicKeyBase64 = publicKey
        .export({
        type: "spki",
        format: "pem",
    })
        .toString("base64");
    const privateKeyBase64 = privateKey
        .export({
        type: "pkcs8",
        format: "pem",
    })
        .toString("base64");
    const { encryptedPrivateKey, encryptedPublicKey, iV } = encryptMyKeys(privateKeyBase64, publicKeyBase64);
    yield Key.create({
        publicKey: encryptedPrivateKey,
        privateKey: encryptedPublicKey,
        iV,
    });
    return { cryptoPublicKey: publicKey, cryptoPrivateKey: privateKey };
});
const encryptionKey = process.env.ENCRYPT_KEY_RSA;
const encrypt = (key, iV) => {
    const cypher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iV);
    let encryptedKey = cypher.update(key);
    encryptedKey = Buffer.concat([encryptedKey, cypher.final()]);
    return encryptedKey.toString("base64");
};
export const encryptMyKeys = (privateKey, publicKey) => {
    const iV = crypto.randomBytes(16);
    return {
        encryptedPrivateKey: encrypt(privateKey, iV),
        encryptedPublicKey: encrypt(publicKey, iV),
        iV: iV.toString("base64"),
    };
};
const decrypt = (key, iVBuffer) => {
    const keyBuffer = Buffer.from(key, "base64");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iVBuffer);
    let decryptedKey = decipher.update(keyBuffer);
    decryptedKey = Buffer.concat([decryptedKey, decipher.final()]);
    return decryptedKey;
};
export const decryptMyKeys = (encryptedPrivateKey, encryptedPublicKey, iV) => {
    const iVBuffer = Buffer.from(iV, "base64");
    return {
        decryptedPrivateKey: decrypt(encryptedPrivateKey, iVBuffer),
        decryptedPublicKey: decrypt(encryptedPublicKey, iVBuffer),
    };
};
