import fs from "fs";
import { uuid } from "../utils/uuid";
import { Log } from "../utils/logger";

export class AppSettings {
  private readonly _fs: typeof fs;
  private readonly _logger: Log = new Log();

  constructor() {
    this._fs = fs;
  }

  private checkIfAuthFileExists(): boolean {
    return fs.existsSync(".connectQArc");
  }

  public createAuthFile(): void {
    // if (!this.checkIfAuthFileExists()) {
    //   const obj = {
    //     agentId: uuid(),
    //   };
    //   fs.writeFile(".connectQArc", JSON.stringify(obj), (err) => {
    //     throw err;
    //   });
    // }
  }
}
