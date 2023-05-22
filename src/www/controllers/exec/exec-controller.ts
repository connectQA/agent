import { Request, Response } from "express";
import { uuid } from "../../../utils/uuid";
import { config } from "../../../../env.config";

export function executionController() {
  return {
    exec(req: Request, res: Response) {
      const id = uuid();
      res.json({
        id,
        apiKey: config.API_KEY,
      });
    },
  };
}
