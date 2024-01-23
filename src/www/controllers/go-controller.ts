import fs from "fs";
import { Request, Response } from "express";
import { ErrorCode } from "../../types/error.js";
import { ConnectQAWorker } from "../../worker/worker.js";
import { ConnectQAError } from "../../utils/connectQA-error.js";
import { Report } from "../../report/report.js";
import { ConnectQAAgentResponse } from "../../types/response.js";
import { Log } from "../../utils/logger.js";

export function goController() {
  const worker = new ConnectQAWorker();
  const report = new Report();
  const logger = new Log();
  return {
    async go(req: Request, res: Response) {
      try {
        if (!req.file) {
          throw new ConnectQAError({
            code: ErrorCode.FILE_NOT_RECEIVED,
            params: {},
          });
        }
        if (!fs.existsSync("tmp/target.spec.js")) {
          throw new ConnectQAError({
            code: ErrorCode.FILE_NOT_RECEIVED,
            params: {},
          });
        }
        if (await worker.executeCode(req.body.type)) {
          const result: any = report.getPlaywrightReportAsJSON();
          const errors: any = result.errors;
          logger.info(
            `Test [${req.body.id}] executed successfully with ${errors.length} errors.`,
            true
          );
          if (errors.length > 0) {
            errors.length.forEach((err: any) => {
              logger.error(err);
            });
          }
          const testResult: ConnectQAAgentResponse = {
            id: req.body.id,
            result,
            logs: report.getLogs(),
            datetime: new Date()
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, ""),
          };
          res.json(testResult);
        } else {
          res.status(500).send();
        }
      } catch (error) {
        console.log(error);
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
