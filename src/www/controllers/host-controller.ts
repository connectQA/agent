import { Request, Response } from "express";
import { Token } from "../../token/index.js";
import { details } from "../../utils/details.js";

export function hostController() {
  const token = new Token();
  return {
    async details(req: Request, res: Response) {
      try {
        if (req.body.token != token.token) {
          res.status(401).send({
            exp: req.body.token,
            cur: token.token,
          });
        } else res.json(details());
      } catch (error) {
        res.status(500).send(error);
      }
    },
  };
}
