import fs from "fs";

export interface ConnectQAReport {
  getPlaywrightReportAsString(): Buffer;
}
