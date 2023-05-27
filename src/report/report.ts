import { ConnectQAReport, Result } from "../types/report";

export class Report implements ConnectQAReport {
  public processPlaywrightReport(): Result {
    // TODO
    return {
      id: "",
      result: "",
    };
  }
  public async send(): Promise<boolean> {
    // TODO
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
