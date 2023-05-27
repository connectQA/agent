import { ConnectQALogger } from "../types/logger";

export class Log implements ConnectQALogger {
  public info(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: INFO: ${msg}`);
  }

  public error(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: ERROR: ${msg}`);
    throw new Error();
  }

  private getFormattedUTCDate(): string {
    return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  }
}
