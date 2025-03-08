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
exports.decryptMyKeys = exports.encryptMyKeys = exports.makeKeys = exports.getKeys = void 0;
const Key_1 = __importDefault(require("../models/Key"));
const crypto_1 = __importDefault(require("crypto"));
const getKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const keysArr = yield Key_1.default.find({});
    if (!(keysArr === null || keysArr === void 0 ? void 0 : keysArr.length))
        return false;
    const { decryptedPrivateKey, decryptedPublicKey } = (0, exports.decryptMyKeys)(keysArr[0].publicKey, keysArr[0].privateKey, keysArr[0].iV);
    const cryptoPublicKey = crypto_1.default.createPublicKey(decryptedPublicKey !== null && decryptedPublicKey !== void 0 ? decryptedPublicKey : "");
    const cryptoPrivateKey = crypto_1.default.createPrivateKey(decryptedPrivateKey !== null && decryptedPrivateKey !== void 0 ? decryptedPrivateKey : "");
    return { cryptoPublicKey, cryptoPrivateKey };
});
exports.getKeys = getKeys;
const makeKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync("rsa", {
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
    const { encryptedPrivateKey, encryptedPublicKey, iV } = (0, exports.encryptMyKeys)(privateKeyBase64, publicKeyBase64);
    yield Key_1.default.create({
        publicKey: encryptedPrivateKey,
        privateKey: encryptedPublicKey,
        iV,
    });
    return { cryptoPublicKey: publicKey, cryptoPrivateKey: privateKey };
});
exports.makeKeys = makeKeys;
const encryptionKey = process.env.ENCRYPT_KEY_RSA;
const encrypt = (key, iV) => {
    const cypher = crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iV);
    let encryptedKey = cypher.update(key);
    encryptedKey = Buffer.concat([encryptedKey, cypher.final()]);
    return encryptedKey.toString("base64");
};
const encryptMyKeys = (privateKey, publicKey) => {
    const iV = crypto_1.default.randomBytes(16);
    return {
        encryptedPrivateKey: encrypt(privateKey, iV),
        encryptedPublicKey: encrypt(publicKey, iV),
        iV: iV.toString("base64"),
    };
};
exports.encryptMyKeys = encryptMyKeys;
const decrypt = (key, iVBuffer) => {
    const keyBuffer = Buffer.from(key, "base64");
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey, "hex"), iVBuffer);
    let decryptedKey = decipher.update(keyBuffer);
    decryptedKey = Buffer.concat([decryptedKey, decipher.final()]);
    return decryptedKey;
};
const decryptMyKeys = (encryptedPrivateKey, encryptedPublicKey, iV) => {
    const iVBuffer = Buffer.from(iV, "base64");
    return {
        decryptedPrivateKey: decrypt(encryptedPrivateKey, iVBuffer),
        decryptedPublicKey: decrypt(encryptedPublicKey, iVBuffer),
    };
};
exports.decryptMyKeys = decryptMyKeys;
