import { LogInterface } from "../types/logger";

export class Log implements LogInterface {
  public info(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: INFO: ${msg}`);
  }

  public error(msg: string): void {
    console.log(`${this.getFormattedUTCDate()}: ERROR: ${msg}`);
  }

  private getFormattedUTCDate(): string {
    return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  }
}
