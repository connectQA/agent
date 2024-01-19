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

  public getPlaywrightReportAsJSON(): any {
    const report: string = fs.readFileSync(this._reportPath).toString();
    return JSON.parse(report);
  }

  public getLogs(): string[] {
    return fs.readFileSync(this._logPath).toString().split("\n").slice(0, -1);
  }
}
