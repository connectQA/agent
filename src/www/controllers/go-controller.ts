import { Request, Response } from "express";
import { uuid } from "../../utils/uuid";
import { config } from "../../../connectqa.config";

export function goController() {
  return {
    go(req: Request, res: Response) {
      const id = uuid();
      res.json({
        id,
        apiKey: config.API_KEY,
      });
    },
  };
}
