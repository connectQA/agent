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
        if (!req.body.instructions) {
          throw new ConnectQAError({
            code: ErrorCode.INSTRUCTIONS_NOT_FOUND,
            params: {},
          });
        }
        await worker.clearTargetFile();
        await worker.writeCodeToTargetFile(req.body.instructions);
        const startedAt = new Date();
        if (await worker.executeCode(req.body.headed)) {
          const finishedAt = new Date();
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
            success: errors.length == 0,
            startedAt,
            finishedAt,
            result: {
              logs: report.getLogs(),
              run: result,
            },
            config: {
              headed: req.body.headed,
            },
          };
          res.json(testResult);
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
