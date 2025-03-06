import Key from "../models/Key";
import crypto from "crypto";

// export const getFormattedPEMKeys = (typeKey: "PRIVATE" | "PUBLIC") => {
//   const key =
//     typeKey === "PRIVATE"
//       ? process.env.REFRESH_PRIVATE_KEY
//       : process.env.REFRESH_PUBLIC_KEY;

//   const keyBase64 = Buffer.from(key!, "utf-8").toString("base64");

//   const formattedKey = `-----BEGIN ${typeKey} KEY-----\n${keyBase64}\n-----END ${typeKey} KEY-----`;

//   return formattedKey;
// };

export const getKeys = async () => {
  const keysArr = await Key.find({});

  if (!keysArr?.length) return false;

  const { decryptedPrivateKey, decryptedPublicKey } = decryptMyKeys(
    keysArr[0].publicKey,
    keysArr[0].privateKey,
    keysArr[0].iV
  );

  // const cryptoPublicKey = crypto.createPublicKey(keysArr[0].publicKey);
  // const cryptoPrivateKey = crypto.createPrivateKey(keysArr[0].privateKey);
  const cryptoPublicKey = crypto.createPublicKey(decryptedPublicKey ?? "");
  const cryptoPrivateKey = crypto.createPrivateKey(decryptedPrivateKey ?? "");

  return { cryptoPublicKey, cryptoPrivateKey };
};

export const makeKeys = async () => {
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

  const { encryptedPrivateKey, encryptedPublicKey, iV } = encryptMyKeys(
    privateKeyBase64,
    publicKeyBase64
  );

  // await Key.create({
  //   publicKey: publicKeyBase64,
  //   privateKey: privateKeyBase64,
  //   // iV,
  // });
  await Key.create({
    publicKey: encryptedPrivateKey,
    privateKey: encryptedPublicKey,
    iV,
  });

  return { cryptoPublicKey: publicKey, cryptoPrivateKey: privateKey };
};

const encryptionKey = process.env.ENCRYPT_KEY_RSA;

const encrypt = (key: string, iV: Buffer) => {
  const cypher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey!, "hex"),
    iV
  );

  let encryptedKey = cypher.update(key);
  encryptedKey = Buffer.concat([encryptedKey, cypher.final()]);
  return encryptedKey.toString("base64");
};

export const encryptMyKeys = (privateKey: string, publicKey: string) => {
  const iV = crypto.randomBytes(16);

  return {
    encryptedPrivateKey: encrypt(privateKey, iV),
    encryptedPublicKey: encrypt(publicKey, iV),
    iV: iV.toString("base64"),
  };
};

const decrypt = (key: string, iVBuffer: Buffer) => {
  const keyBuffer = Buffer.from(key, "base64");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey!, "hex"),
    iVBuffer
  );

  let decryptedKey = decipher.update(keyBuffer);
  decryptedKey = Buffer.concat([decryptedKey, decipher.final()]);
  return decryptedKey;
};

export const decryptMyKeys = (
  encryptedPrivateKey: string,
  encryptedPublicKey: string,
  iV: string
) => {
  const iVBuffer = Buffer.from(iV, "base64");

  return {
    decryptedPrivateKey: decrypt(encryptedPrivateKey, iVBuffer),
    decryptedPublicKey: decrypt(encryptedPublicKey, iVBuffer),
  };
};
