import { ConnectQALogger } from "../types/logger";
import fs from "fs";
import path from "path";
import { pathExistsOrCreate } from "./folder";

export class Log implements ConnectQALogger {
  private readonly _logger: fs.WriteStream;
  private readonly _pathToLogFile: string;

  constructor() {
    pathExistsOrCreate("logs");
    this._pathToLogFile = path.join("logs", "/process.log");
    this._logger = this.logger();
  }

  public info(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: INFO: ${msg}`);
    this._logger.write(`${this.getFormattedUTCDate()}: INFO: ${msg}\n`);
  }

  public error(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: ERROR: ${msg}`);
    this._logger.write(`${this.getFormattedUTCDate()}: ERROR: ${msg}\n`);
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
