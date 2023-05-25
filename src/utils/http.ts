import axios from "axios";
import { config } from "../../connectqa.config";
import { Log } from "./logger";

export class ConnectQARequest {
  private readonly _connectQAServer: string;
  private readonly _logger: Log = new Log();

  constructor() {
    if (!config.CONNECTQA_SERVER) {
      throw new Error("The server stablished for Connect QA is undefined.");
    }
    this._connectQAServer = config.CONNECTQA_SERVER;
  }

  public async validatingApiKey(): Promise<boolean> {
    const result = await axios.post(`${this._connectQAServer}/validate`, {
      key: config.API_KEY,
    });
    if (result.data === true) {
      this._logger.info("The provided API key is valid.");
      return true;
    }
    this._logger.error("The provided API key was invalid.");
    return false;
  }
}
