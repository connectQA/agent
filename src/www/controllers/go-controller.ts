import fs from "fs";
import { Request, Response } from "express";
import { Log } from "../../utils/logger";
import { ErrorCode } from "../../types/error";
import { ConnectQAWorker } from "../../worker/worker";
import { ConnectQAError } from "../../utils/connectQA-error";

export function goController() {
  const worker = new ConnectQAWorker();
  return {
    async go(req: Request, res: Response) {
      try {
        if (!req.file) {
          throw new ConnectQAError({
            code: ErrorCode.FILE_NOT_RECEIVED,
            params: {},
          });
        }
        if (!fs.existsSync("tmp/index.spec.ts")) {
          throw new ConnectQAError({
            code: ErrorCode.FILE_NOT_RECEIVED,
            params: {},
          });
        }
        const response = await worker.executeCode();
        res.json({
          response,
        });
      } catch (error) {
        throw new ConnectQAError({
          code: ErrorCode.UNKNOWN_ERROR,
          params: {
            error,
          },
        });
      }
    },
  };
}
