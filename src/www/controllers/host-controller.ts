import fs from "fs";
import { Request, Response } from "express";
import { ErrorCode } from "../../types/error.js";
import { ConnectQAError } from "../../utils/connectQA-error.js";
import { ConnectQAAgentResponse } from "../../types/response.js";
import { Token } from "../../../token/index.js";
import { details } from "../../utils/details.js";

export function hostController() {
  const token = new Token();
  return {
    async details(req: Request, res: Response) {
      try {
        if (req.body.token != token.value) {
          res.status(401).send({
            exp: req.body.token,
            cur: token.value,
          });
        } else res.json(details());
      } catch (error) {
        res.status(500).send(error);
      }
    },
  };
}
