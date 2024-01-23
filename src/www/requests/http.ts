import axios from "axios";
import { ConnectQAError } from "../../utils/connectQA-error.js";
import { ErrorCode } from "../../types/error.js";
import { Log } from "../../utils/logger.js";

export class ConnectQAHTTP {
  logger = new Log();

  public async validateToken(
    accountId: string,
    token: string
  ): Promise<boolean> {
    try {
      const result = await axios.post(
        `${process.env.CONNECTQA_SERVER}/validate`,
        {
          accountId,
          token,
        }
      );
      const { isValid } = result.data;
      if (!isValid) {
        this.logger.error(ErrorCode.INVALID_API_KEY);
        throw new ConnectQAError({
          code: ErrorCode.INVALID_API_KEY,
          params: {
            accountId,
            token,
          },
        });
      }
      return true;
    } catch (error: any) {
      console.error(error.message);
      throw new Error();
    }
  }

  public async registerTunnel(url: string, accountId: string): Promise<void> {
    await axios
      .post(`${process.env.CONNECTQA_SERVER}/register`, {
        accountId,
        url,
      })
      .then((result) => {
        const { success } = result.data;
        if (!success) {
          throw new ConnectQAError({
            code: ErrorCode.TUNNEL_CREATION_ERROR,
            params: {
              status: result.status,
            },
          });
        }
      })
      .catch((err) => {
        this.logger.error(err);
        throw new ConnectQAError({
          code: ErrorCode.UNKNOWN_ERROR,
          params: {
            error: err.message,
          },
        });
      });
  }
}
