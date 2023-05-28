import fs from "fs";
import path from "path";
import { ConnectQAReport } from "../types/report";

export class Report implements ConnectQAReport {
  private readonly _reportPath: string;

  constructor() {
    this._reportPath = path.join("out", "results.json");
  }

  public getPlaywrightReportAsString(): Buffer {
    return fs.readFileSync(this._reportPath);
  }
}
