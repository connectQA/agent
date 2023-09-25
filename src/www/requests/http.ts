import axios from "axios";
import { config } from "../../../connectqa.config.js";
import { ConnectQAError } from "../../utils/connectQA-error.js";
import { ErrorCode } from "../../types/error.js";
import { Log } from "../../utils/logger.js";

export class ConnectQAHTTP {
  logger = new Log();

  public async validateToken(accountId: string, token: string): Promise<boolean> {
    const result = await axios.post(`${config.CONNECTQA_SERVER}/validate`, {
      accountId,
      token,
    });
    const { isValid, current } = result.data;
    if (!isValid) {
      throw new ConnectQAError({
        code: ErrorCode.INVALID_API_KEY,
        params: {
          accountId: accountId,
          token: token.replace(/(?<!^).(?!$)/g, "*"),
        },
      });
    }
    if (!current) {
      return await this.refresh();
    }
    return true;
  }

  public async refresh(): Promise<boolean> {
    this.logger.info("Refreshing token...", false);
    return true;
  }

  public async getConfig() {}
}
