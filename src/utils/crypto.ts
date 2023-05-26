import crypto from "crypto";
import { config } from "../../connectqa.config";
import { CryptoHelper } from "../types/crypto";
import { ConnectQAError } from "./connectQA-error";
import { ErrorCode } from "../types/error";

export class EncryptionHelper implements CryptoHelper {
  private readonly _secretKey: string;
  private readonly _key: string;
  private readonly _encryptionIV: string;

  constructor() {
    if (!config.SECRET_KEY) {
      throw new ConnectQAError({
        code: ErrorCode.SECRET_KEY_NOT_FOUND,
        params: {
          secretKey: config.SECRET_KEY,
        },
      });
    }
    this._secretKey = config.SECRET_KEY!;
    this._key = this.generateCryptoKey();
    this._encryptionIV = this.generateEncryptionIV();
  }

  public encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      this._key,
      this._encryptionIV
    );
    return Buffer.from(
      cipher.update(data, "utf8", "hex") + cipher.final("hex")
    ).toString("base64");
  }

  public decrypt(data: string): string {
    const buff = Buffer.from(data, "base64");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      this._key,
      this._encryptionIV
    );
    return (
      decipher.update(buff.toString("utf8"), "hex", "utf8") +
      decipher.final("utf8")
    );
  }

  private generateCryptoKey(): string {
    return crypto
      .createHash("sha512")
      .update(this._secretKey)
      .digest("hex")
      .substring(0, 32);
  }

  private generateEncryptionIV(): string {
    return crypto
      .createHash("sha512")
      .update(this._secretKey)
      .digest("hex")
      .substring(0, 16);
  }
}
