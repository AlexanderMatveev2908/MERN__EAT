export const getFormattedPEMKeys = (typeKey: "PRIVATE" | "PUBLIC") => {
  const key =
    typeKey === "PRIVATE"
      ? process.env.REFRESH_PRIVATE_KEY
      : process.env.REFRESH_PUBLIC_KEY;

  const keyBase64 = Buffer.from(key!, "base64").toString("utf-8");

  const formattedKey = `-----BEGIN ${typeKey} KEY-----\n${keyBase64}\n-----END ${typeKey} KEY-----`;

  return formattedKey;
};
