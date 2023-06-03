import fs from "fs";
import { Request, Response } from "express";
import { ErrorCode } from "../../types/error";
import { ConnectQAWorker } from "../../worker/worker";
import { ConnectQAError } from "../../utils/connectQA-error";
import { Report } from "../../report/report";
import { ConnectQAAgentResponse } from "../../types/response";

export function goController() {
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
          const testResult: string = report.getPlaywrightReportAsString();
          const result: ConnectQAAgentResponse = {
            result: JSON.parse(testResult),
            logs: report.getLogsAsString(),
            datetime: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
          };
          res.json(result);
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
