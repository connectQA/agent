import { ConnectQALogger } from "../types/logger";
import fs from "fs";
import path from "path";

export class Log implements ConnectQALogger {
  private readonly _logger: fs.WriteStream;
  private readonly _pathToLogFile: string;

  constructor() {
    this._logger = this.logger();
    this._pathToLogFile = path.join("logs", "/process.log");
  }

  public info(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: INFO: ${msg}`);
    this._logger.write(`${this.getFormattedUTCDate()}: INFO: ${msg}`);
  }

  public error(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: ERROR: ${msg}`);
    this._logger.write(`${this.getFormattedUTCDate()}: ERROR: ${msg}`);
    throw new Error();
  }

  public clear(): void {
    fs.writeFile(this._pathToLogFile, "", () => {});
  }

  private getFormattedUTCDate(): string {
    return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  }

  private logger() {
    return fs.createWriteStream(this._pathToLogFile, {
      flags: "a",
    });
  }
}
