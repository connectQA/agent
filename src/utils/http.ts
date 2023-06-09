import axios from "axios";
import { config } from "../../connectqa.config";
import { Log } from "./logger";
import { ConnectQAError } from "./connectQA-error";
import { ErrorCode } from "../types/error";
import { HTTPHandler } from "../types/http";

export class ConnectQAHTTP implements HTTPHandler {
  private readonly _connectQAServer: string;
  private readonly _logger: Log = new Log();

  constructor() {
    if (!config.API_KEY) {
      throw new ConnectQAError({
        code: ErrorCode.UNDEFINED_API_KEY,
        params: {
          apiKey: config.API_KEY,
        },
      });
    }
    this._connectQAServer = config.CONNECTQA_SERVER;
  }

  public async validateApiKey(): Promise<boolean> {
    const result = await axios.post(`${this._connectQAServer}/validate`, {
      key: config.API_KEY,
    });
    if (result.data === true) {
      this._logger.info("The provided API key is valid.", false);
      return true;
    }
    this._logger.error("The provided API key was invalid.");
    throw new ConnectQAError({
      code: ErrorCode.INVALID_API_KEY,
      params: {
        apiKey: config.API_KEY,
      },
    });
  }
}
