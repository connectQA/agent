import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { ErrorCode } from "../../types/error";
import { ConnectQAWorker } from "../../worker/worker";
import { ConnectQAError } from "../../utils/connectQA-error";
import { Report } from "../../report/report";

export function goController() {
  const reportPath: string = path.join("playwright-report", "results.json");

  const worker = new ConnectQAWorker();
  const report = new Report();
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
        if (await worker.executeCode()) {
          const result: any = report.getPlaywrightReportAsString();
          res.json({
            result: JSON.parse(result),
          });
        } else {
          res.status(500).send();
        }
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
