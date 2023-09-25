import fs from "fs";
import path from "path";
import { ConnectQAReport } from "../types/report.js";

export class Report implements ConnectQAReport {
  private readonly _reportPath: string;
  private readonly _logPath: string;

  constructor() {
    this._reportPath = path.join("out", "results.json");
    this._logPath = path.join("logs", "process.log");
  }

  public getPlaywrightReportAsString(): string {
    return fs.readFileSync(this._reportPath).toString();
  }

  public getLogsAsString(): string[] {
    return fs.readFileSync(this._logPath).toString().split("\n");
  }
}
