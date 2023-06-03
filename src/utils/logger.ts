import { ConnectQALogger } from "../types/logger";
import fs from "fs";
import path from "path";
import { pathExistsOrCreate } from "./folder";

export class Log implements ConnectQALogger {
  private readonly _writer: fs.WriteStream;
  private readonly _pathToLogFile: string;
  private _logger = "";

  constructor() {
    pathExistsOrCreate("logs");
    this._pathToLogFile = path.join("logs", "/process.log");
    this._writer = this.logger();
  }

  public info(msg: string, save: boolean): void {
    this._logger = `${this.getFormattedUTCDate()}: INFO: ${msg}`;
    console.log(this._logger);
    if (save) this._writer.write(`${this._logger}\n`);
  }

  public error(msg: string): void {
    this._logger = `${this.getFormattedUTCDate()}: ERROR: ${msg}`;
    console.log(this._logger);
    this._writer.write(`${this.logger}\n`);
  }

  public clear(): void {
    this._logger = "";
    fs.writeFile(this._pathToLogFile, "", () => undefined);
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
