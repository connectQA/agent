import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { uuid } from "../../utils/uuid";
import { config } from "../../../connectqa.config";
import { ConnectQAError } from "../../utils/connectQA-error";
import { ErrorCode } from "../../types/error";
import { ConnectQAWorker } from "../../worker/worker";

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
        console.error(error);
      }
    },
  };
}
