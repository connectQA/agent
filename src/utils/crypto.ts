import crypto from "crypto";
import { config } from "../../connectqa.config";

if (!config.SECRET_KEY) {
  throw new Error("Secret key is required.");
}

const key = crypto
  .createHash("sha512")
  .update(config.SECRET_KEY)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(config.SECRET_KEY)
  .digest("hex")
  .substring(0, 16);

export function encrypt(data: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64");
}

export function decrypt(data: string): string {
  const buff = Buffer.from(data, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIV);
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  );
}
